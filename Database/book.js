const mongoose=require("mongoose");

//creating a Book schema
const bookSchema = mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage:Number,
    category:[String],
    publication:String
})

//Create a book model
const BookModel = mongoose.model(bookSchema)
module.exports=BookModel