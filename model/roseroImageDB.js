const {Sequelize, DataTypes} = require("sequelize")
const db = require("./db")

const roseroImageDB = db.define("roseroImageDB",{
    desId:{
        type:DataTypes.TEXT,
    },
    path:{
        type:DataTypes.TEXT,
    }
})

roseroImageDB.sync({force:false},()=>console.log("imagesDB is Ready!"))

module.exports = roseroImageDB