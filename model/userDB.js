const {Sequelize, DataTypes, Model} = require('sequelize')
const db  = require('./db')

const userDB = db.define("userAdmin",{
    username:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    password:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    fullaname:{
        type:DataTypes.TEXT
    },
    address:{
        type:DataTypes.TEXT
    },
    birthdate:{
        type:DataTypes.TEXT
    },
    contactNumber:{
        type:DataTypes.TEXT
    },
    facebookAcc:{
        type:DataTypes.TEXT
    },
    emailAcc:{
        type:DataTypes.TEXT
    },
    priv:{
        type:DataTypes.TEXT
    }
})

userDB.sync({force:false},()=>console.log("imagesDB is Ready!"))

module.exports = userDB