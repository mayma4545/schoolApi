const express = require('express')
const app = express()
const PORT = 8000

app.get('/', (req,res)=>{
    res.json({"data": "hellow"})
})

app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))