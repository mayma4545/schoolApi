const express = require('express')
const desDB = require('./model/des')
const { data } = require('./data')
const mainDB = require('./model/mainDB')
const { mainImage } = require('./images')
const cors = require("cors")
const app = express()
const PORT = 6000


app.use((req,res,next)=>{
    console.log(`reques from ${req.ip}`)
    next()
})
app.use(cors())

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.get('/data', (req,res)=>{
    data.forEach(async data =>{
        try {
            await desDB.create({desId: data.id ,building:data.building, buildingType:"Room",room:data.room,description:data.description,
                section:data.section,gate:data.gate, gradeLevel:data.grade_level, teacherFirst:data.teacher, teacherLast:data.last, teacherMiddle:'uwu', assistantTeacherFirst:data.teacher_assist, assistantTeacherLast:data.last2, assistantTeacherMiddle:'uwu'
 
            })
             res.json({'message':'data has been saved!'})
        } catch (error) {
            console.log(error)
        }
        
    })
   
})
app.get('/images' ,(req , res)=>{
    try {
        mainImage.forEach(async(data)=>{
            await mainDB.create({desId:data.id, path:data.path})
        })
       res.send("done!")
      
    } catch (error) {
        console.log(error)
    }
  
})

app.use("/gate", require("./routes/mainGateRouter"))
app.use("/images", require("./routes/imagesRouter"))
app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))