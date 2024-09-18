const express = require('express')
const desDB = require('./model/des')
const { data } = require('./data')
const mainDB = require('./model/mainDB')
const adminData = require("./adminData")
const adminDesDB = require("./model/adminDesDB")
const adminImageDes = require("./model/adminImageDB")
const {adminImage} = require("./adminImages")
const { mainImage } = require('./images')
const roserData = require("./roseroData")
const roseroDesDB = require("./model/roseroDesDB")
const roseroImageDB = require("./model/roseroImageDB")
const roseroImage = require("./pages/roseroImages")
const cors = require("cors")
const numCPUs = require('os').cpus().length;
const app = express()
const PORT = 3000
const cluster = require('cluster')
const adminImageDB = require('./model/adminImageDB')
const roseroData = require('./roseroData')

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
}else{

app.use(express.json());


app.use((req,res,next)=>{
    const now = new Date()
    
    console.log(`Worder: ${process.pid}[${req.method}] Request to [ ${req.url} ] from ${req.ip} on ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}\n`)
    next()
})
app.use(cors({origin:'*'}))

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.get('/dadada', (req,res)=>{
    roseroData.forEach(async data =>{
        try {
            await roseroDesDB.create({desId: data.id ,building:data.building, buildingType:"Room",room:data.room,description:data.description,
                section:data.section,gate:data.gate, gradeLevel:data.grade_level, teacherFirst:data.teacher, teacherLast:data.last, teacherMiddle:'uwu', assistantTeacherFirst:data.teacher_assist, assistantTeacherLast:data.last2, assistantTeacherMiddle:'uwu', facilities:data.facilities
 
            })
           
        } catch (error) {
            console.log(error)
        }
        
    })
    res.json({'message':'data has been saved!'})
   
})
app.get('/imagess' ,(req , res)=>{
    try {
        roseroImage.forEach(async(data)=>{
            await roseroImageDB.create({desId:data.id, path:data.path})
        })
       res.send("done!")
      
    } catch (error) {
        console.log(`erro on images ${error}`)
    }
  
})


app.use("/gate", require("./routes/mainGateRouter"))
app.use("/gate", require("./routes/adminGateRoute"))
app.use("/gate", require("./routes/roseroGateRoutes"))
app.use("/images", require("./routes/imagesRouter"))
app.use("/admin", require("./routes/adminRoute"))
app.use("/map", require("./routes/mapRoute"))
app.use("/user", require("./routes/userAdminRoute"))
app.use("/action", require("./routes/actionRoute"))
app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))

}