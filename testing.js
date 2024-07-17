const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, "assets/Path/Main/Building 2/Comfort Room CR near Room 4/9.jpg")

fs.access(dir, fs.constants.F_OK, err=>{
    console.log(err)
})
console.log(dir)