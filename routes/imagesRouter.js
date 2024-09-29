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
const stream = require("stream")

// const upload = multer({
//   storage: multer.memoryStorage(), // Store the file in memory instead of disk
// });

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

//   const { google } = require('googleapis');

// // Path to your service account key file
// const KEYFILEPATH = "./concise-reserve-396907-1f8e81885058.json"

// // Scopes required for Google Drive
// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// const drive = google.drive({ version: 'v3', auth });

// async function uploadFileToDrive(fileBuffer, fileName) {
//   try {
//     const fileMetadata = {
//       name: fileName,
//     };
//     const media = {
//       mimeType: 'image/jpeg', // Adjust this based on file type
//       body: stream.Readable.from(fileBuffer), // Stream the file from memory
//     };
    
//     const response = await drive.files.create({
//       resource: fileMetadata,
//       media: media,
//       fields: 'id',
//     });

//     return response.data.id;
//   } catch (error) {
//     throw new Error(`Error uploading file to Google Drive: ${error}`);
//   }
// }

// // Example usage
// imagesRouter.route("/testing")
//   .post(upload.single("photo"),async(req,res)=>{
//     const fileBuffer = req.file.buffer; // Get the file buffer from multer
//     const fileName = req.file.originalname;

//     // Upload the file buffer directly to Google Drive
//     const fileId = await uploadFileToDrive(fileBuffer, fileName);
//     console.log(fileId)
//     console.log("adding image")
//     res.send({ success: true, fileId });
//   })
//   .get(async(req,res)=>{
//     const fileId = "1vjMTnmVAxr4eq0LQDKS1alJnEsFbsPHr"; // File ID from the request
//     try {
//       // Step 1: Fetch file metadata (to confirm the file exists and check its MIME type)
//       const fileMetadata = await drive.files.get({
//         fileId: fileId,
//         fields: 'id, name, mimeType',
//       });
  
//       // Check if the file is an image (you can extend this for other types)
//       const mimeType = fileMetadata.data.mimeType;
//       if (!mimeType.startsWith('image/')) {
//         return res.status(400).send('The requested file is not an image.');
//       }
  
//       // Step 2: Fetch the file content as a stream
//       const response = await drive.files.get(
//         {
//           fileId: fileId,
//           alt: 'media',
//         },
//         { responseType: 'stream' }
//       );
  
//       // Set the correct content type (e.g., image/jpeg)
//       res.setHeader('Content-Type', mimeType);
  
//       // Step 3: Pipe the stream to the client
//       response.data
//         .on('end', () => {
//           console.log('Image successfully sent to the client.');
//         })
//         .on('error', (error) => {
//           console.error('Error while sending the image:', error);
//           res.status(500).send('Error retrieving the image from Google Drive.');
//         })
//         .pipe(res); // Pipe the image data stream to the response
//     } catch (error) {
//       console.error('Error retrieving image from Google Drive:', error);
//       res.status(500).send('Error retrieving image from Google Drive.');
//     }
//   })

module.exports = imagesRouter;
