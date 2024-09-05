const express = require('express');
const mainDB = require('../model/mainDB')
const adminImagesDB = require("../model/adminImageDB")
const roseroImageDB = require("../model/roseroImageDB")
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');
const imagesRouter = express.Router();
const multer = require("multer")
const {Op} = require("sequelize");
const adminDesDB = require('../model/adminDesDB');
const roseroDesDB = require('../model/roseroDesDB');
const desDB = require('../model/des');

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
      console.log("directory ", req.query.dir)
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
      console.log("gumana")
    } catch (error) {
      console.log(`${req.baseUrl}: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //DELETE IMAGE
imagesRouter.route('/delete')
  .post(async(req,res)=>{
    try {
      let db;
      if(req.body.gate == "main") db = mainDB
      if(req.body.gate == "admin") db = adminImagesDB
      if(req.body.gate == "rosero") db = roseroImageDB
      await db.destroy({where:{id: req.body.id}})
      const oldImagePath = path.join(__dirname, `../${req.body.path}`);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log(`Failed to delete old image: ${err}`);
      });
      console.log("Image Deleted")
      res.json({message:'successs'})

    } catch (error) {
        console.log(`Error on delete image : ${error}`)
        res.json({error})
    }
  })
  
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
imagesRouter.route('/list/:gate/:buildCode/:description')
.get(async (req, res) => {
  try {
    let data;
    if(req.params.gate == "main") data = await desDB.findAll({where:{[Op.or]:
      [
        {buildingType:req.params.buildCode},
        {description: req.params.description}
      ]
    }})
    if(req.params.gate == "admin") data = await adminDesDB.findAll({where:{[Op.or]:
      [
        {buildingType:req.params.buildCode},
        {description: req.params.description}
      ]
    }})
    if(req.params.gate == "rosero") data = await roseroDesDB.findAll({where:{[Op.or]:
      [
        {buildingType:req.params.buildCode},
        {description: req.params.description}
      ]
    }})
    res.json({data})
  } catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

    //update
    imagesRouter.route('/update/:gate/:desId')
  .post(upload.single('photo'), async (req, res) => {
    try {
      let db;
      if (req.params.gate == "main") db = mainDB;
      if (req.params.gate == "admin") db = adminImagesDB;
      if (req.params.gate == "rosero") db = roseroImageDB;
    
      const record = await db.findOne({ where: { id: req.params.desId } });
      console.log("hola")
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
        console.log("no record found")
      }
      console.log(record.path)
      // Delete the old image
      const oldImagePath = path.join(__dirname, `../${record.path}`);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log(`Failed to delete old image: ${err}`);
      });

      // Save the new image
      const newImagePath = `uploads/${req.file.filename}`;

      // Update the database record
      await db.update({ path: newImagePath }, { where: { id: req.params.desId } });

      res.json({ message: 'Image updated successfully', imagePath: newImagePath });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal server error - ${error}` });
    }
  });

module.exports = imagesRouter;
