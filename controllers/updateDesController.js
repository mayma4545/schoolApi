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
const mainDB = require('../model/mainDB') 
const {Op } = require("sequelize")

async function updateDes(req,res){
    try {
        const {
            desId,
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
            description,
            isAllGate,
            prevDes,
            buildingType
          } = req.body
          const json = {
            building:`Building ${building}`,
            section: section || 'null',
            room:room ? `Room ${room}` : 'null',
            gradeLevel: gradeLevel || 'null',
            teacherFirst:teacherFirstname || 'null',
            teacherMiddle:teacherMiddlename || 'null',
            teacherLast:teacherLastname|| 'null',
            assistantTeacherFirst:assistantTeacherFirstname|| 'null',
            assistantTeacherMiddle:assistantTeacherMiddlename || 'null',
            assistantTeacherLast:assistantTeacherLastname|| 'null',
            description:description
        }
     if(isAllGate){
        if(buildingType !== 'Room'){
            
            const ros = await roseroDesDB.findOne({where:{[Op.or] :[{buildingType:buildingType}, {description:prevDes}]}})
            const ad = await adminDesDB.findOne({where:{[Op.or] :[{buildingType:buildingType}, {description:prevDes}]}})
            const ma = await desDB.findOne({where:{[Op.or] :[{buildingType:buildingType}, {description:prevDes}]}})
            console.log(ma.desValues)
            if(ma?.dataValues)await desDB.update({...json}, {where:{desId: ma.dataValues.desId}})
            if(ad?.dataValues)await adminDesDB.update({...json}, {where:{desId: ad.dataValues.desId}})
            if(ros?.dataValues)await roseroDesDB.update({...json}, {where:{desId: ros.dataValues.desId}})
            console.log("have code")
            console.log("Update For all")
            res.json({success:true})
            return
        }
        else{
            console.log("No code")
        }
       
    }
       
     
        if(gate== 'main'){
            await desDB.update({...json}, {where:{desId: desId}})
            console.log("Change for main")
        }
        if(gate== 'admin'){
            await adminDesDB.update({...json}, {where:{desId: desId}})
            console.log("Change for admin")
        }
        if(gate== 'rosero' ){
            await roseroDesDB.update({...json}, {where:{desId: desId}})
            console.log("Change for rosero")
        }
       
      
        // console.log(`rosero : ${ros.dataValues.desId}`)
        // console.log(`admin : ${ad.dataValues.desId}`)
        // console.log(`main : ${ma.dataValues.desId}`)
        console.log("UPdate for one")
        console.log(req.body)
        res.json({success:true})
    } catch (error) {
        console.log(`${error}`)
    }
}

 module.exports = updateDes