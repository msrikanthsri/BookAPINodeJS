require("dotenv").config()

//Framework
//Import express
const { response } = require("express");
const express=require("express");
const mongoose=require("mongoose")

//Database
const database=require("./Database/index")

//Models
const BookModel = require("./Database/book")
const AuthorModel = require("./Database/author")
const PublicationModel = require("./Database/publications")

//initializing Microservices Route
const Books=require("./API/Book")
const Authors=require("./API/Author")
const Publications=require("./API/Publication")


//Initializing express
const shapeAI=express();
//Configurations
shapeAI.use(express.json())

//Establish database Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("Connection Established"))

//initilizng MicroServices
shapeAI.use("/book",Books)
shapeAI.use("/author",Authors)
shapeAI.use("/publication",Publications)





shapeAI.listen(3000,()=>console.log("Hey u are listening at 3000"));