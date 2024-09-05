const {Sequelize, DataTypes, Model} = require('sequelize')
const db  = require('./db')

const roseroDesDB = db.define("roserodes",{
    desId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    building:{
        type:DataTypes.STRING,
        allowNull:false
    },
    buildingType:{
        type:DataTypes.STRING,
        allowNull:true
    },
    room:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    section:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gradeLevel:{
        type:DataTypes.STRING,
        allowNull:false
    },
    teacherFirst:{
        type:DataTypes.STRING,
        allowNull:false
    },
    teacherLast:{
        type:DataTypes.STRING,
        allowNull:false
    },
    teacherMiddle:{
        type:DataTypes.STRING,
        allowNull:true
    },
    assistantTeacherFirst:{
        type:DataTypes.STRING,
        allowNull:false
    },
    assistantTeacherLast:{
        type:DataTypes.STRING,
        allowNull:false
    },
    assistantTeacherMiddle:{
        type:DataTypes.STRING,
        allowNull:true
    },
    facilities:{
        type:DataTypes.STRING
    }
})

roseroDesDB.sync({force:false}, ()=> console.log("desDB is Ready!"))
module.exports = roseroDesDB