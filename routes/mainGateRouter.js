const express = require("express")
const desDB = require("../model/des")
const { where } = require("sequelize")
const mainGateRouter = express.Router()


mainGateRouter.route("/main")
    .get(async(req,res)=>{
        try {
            const datas = await desDB.findAll()
            console.log(`${req.method} - ${req.baseUrl}`)
            res.json(datas)
        } catch (error) {
          console.log(`Error on ${req.baseUrl} - ${error}`)  
        }
    })
mainGateRouter.route("/main/:id")
    .get(async(req,res)=>{
        try {
            const datas = await desDB.findAll({where:{id:req.params.id}})
            res.json(datas)
        } catch (error) {
          console.log(`Error on ${req.baseUrl} - ${error}`)  
        }
    })
module.exports = mainGateRouter