const {Sequelize, DataTypes} = require("sequelize")
const db = require("./db")

const mapImageDb = db.define("mapImages",{
    desId:{
        type:DataTypes.TEXT,
    },
    path:{
        type:DataTypes.TEXT,
    },
    gate:{
        type:DataTypes.TEXT,
    }
})

mapImageDb.sync({force:false},()=>console.log("imagesDB is Ready!"))

module.exports = mapImageDb