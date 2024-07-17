const seq = require('sequelize')
const db = new seq.Sequelize("DWEBMAIN","root","",{
    host:'localhost',
    dialect:'mysql',
    port:3306,
    logging:false
})

module.exports = db