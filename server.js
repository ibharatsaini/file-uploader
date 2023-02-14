const app = require("./app.js")
const mongoose = require("mongoose")

const PORT = 8080

app.listen(PORT,()=>{
    
    console.log(`process started at:- ${PORT}`)
    mongoose.connect(process.env.DATABASE_URI,()=>{
        console.log(`Database started`)
    })
})

