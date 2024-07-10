const seq = require('sequelize')
const db = new seq.Sequelize("me","root","",{
    host:'locahost',
    dialect:'mysql',
    logging:false
})

module.exports = db