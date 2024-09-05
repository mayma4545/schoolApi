const db = require("./db")
const {DataTypes} = require("sequelize")
const actionDB = db.define("actionHistory", {
    desId:{
        type:DataTypes.TEXT,
    },
    action:{
        type:DataTypes.TEXT,
    },
    typeOfData:{
        type:DataTypes.TEXT
    },
    adminUsername:{
        type:DataTypes.TEXT
    },

})

actionDB.sync({force:false})

module.exports = actionDB