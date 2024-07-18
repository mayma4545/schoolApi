const express = require("express")
const adminDesDB = require("../model/adminDesDB")
const { where } = require("sequelize")
const adminGateRoute = express.Router()


adminGateRoute.route("/admin")
    .get(async(req,res)=>{
        try {
            const datas = await adminDesDB.findAll()
            res.json(datas)
        } catch (error) {
          console.log(`Error on ${req.baseUrl} - ${error}`)  
        }
    })
adminGateRoute.route("/admin/:id")
    .get(async(req,res)=>{
        try {
            const datas = await adminDesDB.findAll({where:{desId:req.params.id}})
            res.json(datas)
        } catch (error) {
          console.log(`Error on ${req.baseUrl} - ${error}`)  
        }
    })
module.exports = adminGateRoute