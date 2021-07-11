const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
    id:number,
    name:String,
    books:[String]
})

const publicationModel = mongoose.model(publicationSchema)

module.exports=publicationModel