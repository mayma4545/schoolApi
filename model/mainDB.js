const {Sequelize, DataTypes} = require("sequelize")
const db = require("./db")

const mainDB = db.define("images",{
    desId:{
        type:DataTypes.TEXT,
    },
    path:{
        type:DataTypes.TEXT,
    }
})

mainDB.sync({force:false},()=>console.log("imagesDB is Ready!"))

module.exports = mainDB