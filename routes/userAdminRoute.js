const express = require("express")
const userAdminRoute = express.Router()
const userDB = require("./../model/userDB")


userAdminRoute.route("/")
    .get(async(req,res)=>{
        const result = await userDB.findAll()
        res.json({result})
    })
userAdminRoute.route("/get")
    .get(async(req,res)=>{
        try {
            const result = await userDB.findAll({where:{id:req.body.id}})
            console.log("Getting User data")
            res.json({result})
        } catch (error) {
            console.log("Error on Get user", error)
            res.json({error}) 
        }
    })
    .post(async(req,res)=>{
        try {
            const { username, password, fullaname, birthdate, address, facebookAcc, emailAcc, priv, contactNumber} = req.body
            console.log(req.body)
            await userDB.create({username:username, password:password, fullaname:fullaname, birthdate:birthdate || 'null', address:address || 'null', facebookAcc:facebookAcc || 'null', emailAcc:emailAcc || 'null', priv:priv, contactNumber:contactNumber || 'null'})
            console.log("--- User Created ---")
            res.json({message:'success'})
        } catch (error) {
            // console.log("Error on POST user", error)
            res.json({error})
        }
    })

userAdminRoute.route("/login")
    .get(async(req,res)=>{
        try {
            const result = await userDB.findAll({where:{username: req.query.username}})
            res.json({result})
        } catch (error) {
            console.log("Error on Get Login user", error)
            res.json({error})
        }
    })

 module.exports = userAdminRoute