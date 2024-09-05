const express = require("express")
const actionRouter = express.Router()
const actionDB = require("./../model/actionsDB")
const {Op} = require("sequelize")

actionRouter.route("/")
    .get(async(req,res)=>{
        try {
            const result = await actionDB.findAll()
            res.json({result})
        } catch (error) {
            console.log(error)
            res.json({error})
        }
    })
actionRouter.route("/add/data")
    .get(async(req,res)=>{
        try {
            const result = await actionDB.findAll({where: {adminUsername: req.body.adminUsername, action:'add'}})
            res.status(200).json({result})
        } catch (error) {
            console.log(error)
            res.status(300).json({error})
        }
    })
    .post(async(req,res)=>{
        try {
             await actionDB.create({desId: req.body.desId, 
                                               action:req.body.action,
                                               typeOfData: req.body.typeOfData,
                                               adminUsername: req.body.adminUsername
            })
          res.json({sucess:true})
        } catch (error) {
            console.log(error)
            res.status(300).json({error})
        }
    })


actionRouter.route("/delete/data")
        .get(async(req,res)=>{
            try {
                const result = await actionDB.findAll({where: {adminUsername: req.body.adminUsername, action:'delete'}})
                res.status(200).json({result})
            } catch (error) {
                console.log(error)
                res.status(300).json({error})
            }
        })
        .post(async(req,res)=>{
            try {
                await actionDB.create({desId: req.body.desId, 
                                                action:req.body.action,
                                                typeOfData: req.body.typeOfData,
                                                adminUsername: req.body.adminUsername
                })
            res.json({sucess:true})
            } catch (error) {
                console.log(error)
                res.status(300).json({error})
            }
        })

actionRouter.route("/update/data")
        .get(async(req,res)=>{
            try {
                const result = await actionDB.findAll({where: {adminUsername: req.body.adminUsername, action:'update'}})
                res.status(200).json({result})
            } catch (error) {
                console.log(error)
                res.status(300).json({error})
            }
        })
        .post(async(req,res)=>{
            try {
                await actionDB.create({desId: req.body.desId, 
                                                action:req.body.action,
                                                typeOfData: req.body.typeOfData,
                                                adminUsername: req.body.adminUsername
                })
                console.log("UPDATE ACTION!")
            res.json({sucess:true})
            } catch (error) {
                console.log(error)
                res.status(300).json({error})
            }
        })

actionRouter.route("/user/:username")
        .get(async(req,res)=>{
            try {
                const up = await actionDB.findAndCountAll({where:{
                    [Op.and]:[
                        {adminUsername: req.params.username},
                        {action:"update"}
                    ]
                }})
                const dele = await actionDB.findAndCountAll({where:{
                    [Op.and]:[
                        {adminUsername: req.params.username},
                        {action:"delete"}
                    ]
                }})
                const ad = await actionDB.findAndCountAll({where:{
                    [Op.and]:[
                        {adminUsername: req.params.username},
                        {action:"add"}
                    ]
                }})
                console.log(up.rows)
                res.json({update:up.rows.length, delete:dele.rows.length, add:ad.rows.length})
            } catch (error) {
                console.log(error)
                res.status(300).json({error})
            }
        })


module.exports = actionRouter