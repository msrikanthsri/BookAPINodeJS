const mongoose=require("mongoose");

//creating a Book schema
const bookSchema = mongoose.Schema({
    ISBN:{
        type:String,
        required:true,
        minLength:8,
        maxLength:9
    },
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage:Number,
    category:[String],
    publication:String
})

//Create a book model
const BookModel = mongoose.model("books",bookSchema)
module.exports=BookModel