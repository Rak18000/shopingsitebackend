const express = require("express")
const mongoose= require("mongoose")
const route = require("./routes/route")
const bodyParser = require("body-parser")
const app = express()
const multer =require("multer");
const aws = require("aws-sdk");
require("dotenv").config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(multer().any())

const url = process.env.MONGO_URI;
console.log(url)

mongoose.connect(url)
.then(()=> console.log("Mongodb is connected "))
.catch((err)=> console.log(err))

app.use("/", route)

app.listen(process.env.PORT|| 5000, function(){
    console.log("Express is running on port " + (process.env.PORT || 5000));
})