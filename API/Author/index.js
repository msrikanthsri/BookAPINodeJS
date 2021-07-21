const Router=require("express").Router()
const AuthorModel=require("../../Database/author")


/*
Route : /author/authors
Description : Get All Authors
Access : PUBLIC
Parameters : None
Method : GET
*/
// To Get all authors
Router.get("/authors/",async (req,res)=>{
    const getAllAuthors=await AuthorModel.find()
    return res.json({Books:getAllAuthors})
})

/*
Route : /author/a
Description : Get specific author
Access : PUBLIC
Parameters : id
Method : GET
*/
// To Get specific authors
Router.get("/a/:id",(req,res)=>{
    const getSpecificAuthor=database.authors.filter((author)=> parseInt(req.params.id)===author.id)
    if(getSpecificAuthor.length===0){
        return res.json({"Error":`No Author found for ID ${req.params.id}`})
    }
    return res.json(getSpecificAuthor)
})

/*
Route : /author/authors
Description : to get list of all authors based on ISBN Number
Access : PUBLIC
Parameters : isbn
Method : GET
*/
// To Get specific authors
Router.get("/authors/:isbn",(req,res)=>{
    const getAuthorsISBN=database.authors.filter((author)=>author.ISBN.includes(req.params.isbn))
    if(getAuthorsISBN.length===0){
        return res.json({error:`No author found for this ${req.params.isbn} number`})
    }
    return res.json(getAuthorsISBN)
})

/*
Route : /author/authorsBook/
Description : to get list of all authors based on Book 
Access : PUBLIC
Parameters : book
Method : GET
*/
// To Get specific authors
Router.get("/authorsBook/:name",(req,res)=>{
    const getAuthorsName=database.authors.filter((author)=>author.name.includes(req.params.name))
    if(getAuthorsName.length===0){
        return res.json({error:`No Author found for this ${req.params.name} name`})
    }
    return res.json(getAuthorsName) 
})



//----------------------------------POST BOOK-------------------------



/*
Route : /author/new
Description : To create author
Access : PUBLIC
Parameters : 
Method : POST
*/
// To Create new author
Router.post("/new",async(req,res)=>{
    //Body
    const {newAuthor}=req.body
    const addNewAuthor=await AuthorModel.create(newAuthor)
    //database.authors.push(newAuthor)
    return res.json({Books:newAuthor,Message:"Author Added succesfully !!!"})
})

module.exports=Router