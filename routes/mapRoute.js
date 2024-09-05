const express = require("express")
const mapRoute = express.Router()
const multer = require("multer")
const mapImageDb = require("./../model/mapImagesDb")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
    }
  });
  
  const upload = multer({ storage: storage });

mapRoute.route("/image/get")
    .get( async(req,res)=>{
        try {
            const dir = path.join(__dirname, `../${req.query.dir}`);
      
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
            console.log(`Error on Map: ${error}`)
            res.json({error})
        }
    })

    mapRoute.route("/update")
        .post(upload.single("photo"),async(req,res)=>{
            const record = await mapImageDb.findOne({ where: { id: req.body.id, gate: req.body.gate } });
            console.log(req.body)
            console.log("hola")
            console.log(record)
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
            await mapImageDb.update({ path: newImagePath }, { where: { id: req.body.id } });
      
            res.json({ message: 'Image updated successfully', imagePath: newImagePath });
        })

mapRoute.route("/get/list/:gate/:desId")
    .get(async(req,res)=>{
        try {
            const result = await mapImageDb.findAll({where:{desId:req.params.desId, gate:req.params.gate}})
            console.log(result)
            res.json({result})

        } catch (error) {
            console.log(`Error pm get Map: ${error}`)
            res.json({error})
        }
    })
    .post(upload.single("photo") ,async(req,res)=>{
        try {
            const dir = path.join(`${req.file.path}`)
            await mapImageDb.create({desId:req.params.desId, gate:req.params.gate, path:dir})
            console.log("Successfull adding map!")
            console.log(dir)
            res.json({message:'success'})
        } catch (error) {
            console.log(`Error on Adding Map: ${error}`)
            res.json({error})
        }
    })


    module.exports = mapRoute