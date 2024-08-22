const express = require('express');
const mainDB = require('../model/mainDB')
const adminImagesDB = require("../model/adminImageDB")
const roseroImageDB = require("../model/roseroImageDB")
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');
const imagesRouter = express.Router();
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
  }
});

const upload = multer({ storage: storage });

imagesRouter.route('/get')
  .get(async (req, res) => {
    try {
      const dir = path.join(__dirname, `../${req.query.dir}`);
      console.log(dir)
      fs.readFile(dir, (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'File not found or cannot be read' });
          console.log("file not found")
        }
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': data.length
        });
      //  console.log(data)
        res.end(data);
      });
    } catch (error) {
      console.log(`${req.baseUrl}: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  imagesRouter.route('/list/:gate/:desId')
    .get(async (req, res) => {
      try {
        let data;
        if(req.params.gate == "main") data = await mainDB.findAll({where:{desId:req.params.desId}})
        if(req.params.gate == "admin") data = await adminImagesDB.findAll({where:{desId:req.params.desId}})
        if(req.params.gate == "rosero") data = await roseroImageDB.findAll({where:{desId:req.params.desId}})
        res.json({data})
      } catch (error) {
        console.log(error)
        res.json({error: error})
      }
    })


    //update
    imagesRouter.route('/update/:gate/:desId')
  .post(upload.single('image'), async (req, res) => {
    try {
      let db;
      if (req.params.gate == "main") db = mainDB;
      if (req.params.gate == "admin") db = adminImagesDB;
      if (req.params.gate == "rosero") db = roseroImageDB;

      const record = await db.findOne({ where: { desId: req.params.desId } });

      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }

      // Delete the old image
      const oldImagePath = path.join(__dirname, `../${record.imagePath}`);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log(`Failed to delete old image: ${err}`);
      });

      // Save the new image
      const newImagePath = `uploads/${req.file.filename}`;

      // Update the database record
      await db.update({ imagePath: newImagePath }, { where: { desId: req.params.desId } });

      res.json({ message: 'Image updated successfully', imagePath: newImagePath });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = imagesRouter;
