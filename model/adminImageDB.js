const {Sequelize, DataTypes} = require("sequelize")
const db = require("./db")

const adminImageDB = db.define("adminImagesDB",{
    desId:{
        type:DataTypes.TEXT,
    },
    path:{
        type:DataTypes.TEXT,
    }
})

adminImageDB.sync({force:false},()=>console.log("imagesDB is Ready!"))

module.exports = adminImageDB