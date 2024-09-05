const express = require('express')
const adminRoute = express.Router()
const desDB = require("../model/des")
const roseroDesDB = require("../model/roseroDesDB")
const adminDesDB = require("../model/adminDesDB")
const {Sequelize} = require("sequelize")
const db = require("../model/db")
const path = require("path")
const mainImage = require("../model/mainDB")
const adminImage = require("../model/adminImageDB")
const roseroImage = require("../model/roseroImageDB")
const updateDesController = require("./../controllers/updateDesController")
const crypto = require('crypto');


function generateHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

const multer = require("multer")
const adminImageDB = require('../model/adminImageDB')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
  }
});

const upload = multer({ storage: storage });

const addDes =async (g, req, dbs, gts, code)=>{
    let latestRecord;
        
    try {
        const [results, metadata] = await db.query(
            `SELECT * FROM ${gts} ORDER BY id DESC LIMIT 1;`,
            {
              replacements: { gate: g},
              type: Sequelize.QueryTypes.SELECT,
            }
          );
          latestRecord = Number(results.desId)+1
          console.log(` Gate: ${g} --> ${results.desId}`)
          console.log(` Gate: ${g} --> ${latestRecord}`)
       const {
        gate,
        building,
        section,
        room,
        teacherFirstname,
        teacherMiddlename,
        teacherLastname,
        assistantTeacherFirstname,
        assistantTeacherMiddlename,
        assistantTeacherLastname,
        gradeLevel,
        description
    
      } = req.body
        const json = {
            desId: latestRecord,
            gate:g,
            building:`Building ${building}`,
            section: section || 'null',
            room:room == "null" ? "null" : `Room ${room}`,
            gradeLevel: gradeLevel || 'null',
            teacherFirst:teacherFirstname  || 'null',
            teacherMiddle:teacherMiddlename || 'null',
            teacherLast:teacherLastname || 'null',
            assistantTeacherFirst:assistantTeacherFirstname || 'null',
            assistantTeacherMiddle:assistantTeacherMiddlename || 'null',
            assistantTeacherLast:assistantTeacherLastname || 'null',
            description:description,
             buildingType: code
        }
        const result = await dbs.create({...json})
        console.log(`${g} success`)
        return latestRecord
    } catch (error) {
        console.log(error)
    
    }
}
adminRoute.route("/add/destination")
    .post(async(req,res)=>{
      const uniqueCode = generateHash(req.body.description + Date.now());
        const admin = await addDes("admin", req, adminDesDB, "adminDes", uniqueCode)
        const main =await addDes("main", req, desDB, "des", uniqueCode)
        const rosero =await addDes("rosero", req, roseroDesDB, "roserodes", uniqueCode)
        console.log(`${admin}  ${rosero} ${main}`)
        res.status(200).json({'main': main, 'admin':admin, 'rosero':rosero})
    })

    adminRoute.route("/add/image")
        .post(upload.single("photo") ,async(req,res)=>{
            const dir = path.join(`${req.file.path}`)
            console.log(`Gate: ${req.body.gate} --> ${req.body.desId} --> ${req.file.filename}\n`)
            let GATE = req.body.gate
            let dbs = GATE == 'main' ? mainImage  : GATE == "admin" ? adminImage : roseroImage
            try {
             if(GATE == 'main'){
              const result = await mainImage.create({desId:req.body.desId, path:dir})
              console.log(`Image added to ${req.body.gate} -- ${req.body.desId} PATH: ${dir}`)
              res.json({"success":true})
             }
             if(GATE == 'admin'){
              const result = await adminImage.create({desId:req.body.desId, path:dir})
              console.log(`Image added to ${req.body.gate} -- ${req.body.desId} PATH: ${dir}`)
              res.json({"success":true})
             }
             if(GATE == 'rosero'){
              const result = await roseroImage.create({desId:req.body.desId, path:dir})
              console.log(`Image added to ${req.body.gate} -- ${req.body.desId} PATH: ${dir}`)
              res.json({"success":true})
             }
            } catch (error) {
              console.log(error)
              res.json({'error': `${error}`})
            }

        })
adminRoute.route("/delete/destination")
        .post(async(req,res)=>{
          try {
            const {desId, gate} = req.body
            if(gate == 'main'){
              await desDB.destroy({where:{desId:desId}})
              await mainImage.destroy({where:{desId:desId}})
            }
            if(gate == 'admin'){
              await adminDesDB.destroy({where:{desId:desId}})
              await adminImageDB.destroy({where:{desId:desId}})
            }
            if(gate == 'rosero'){
              await roseroDesDB.destroy({where:{desId:desId}})
              await roseroImage.destroy({where:{desId:desId}})
            }
            console.log(`${desId} is Deleted from ${gate} gate! `)
            res.json({'success':true})
          } catch (error) {
            console.log(`${error}`)
            res.json({error})
          }
        })
adminRoute.route("/update")
        .post(updateDesController)
module.exports = adminRoute