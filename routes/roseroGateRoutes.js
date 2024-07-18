const express = require("express")
const adminDesDB = require("../model/roseroDesDB")
const { where } = require("sequelize")
const roseroDesDB = require("../model/roseroDesDB")
const adminGateRoute = express.Router()


adminGateRoute.route("/rosero")
    .get(async(req,res)=>{
        try {
            const datas = await roseroDesDB.findAll()
            res.json(datas)
        } catch (error) {
          console.log(`Error on ${req.baseUrl} - ${error}`)  
        }
    })
adminGateRoute.route("/rosero/:id")
    .get(async(req,res)=>{
        try {
            const datas = await roseroDesDB.findAll({where:{desId:req.params.id}})
            res.json(datas)
        } catch (error) {
          console.log(`Error on ${req.baseUrl} - ${error}`)  
        }
    })
module.exports = adminGateRoute