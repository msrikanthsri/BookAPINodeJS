//Initializing  Express Router
const Router = require("express").Router()
const BookModel=require("../../Database/book")

/*
Route : /
Description : Get All books
Access : PUBLIC
Parameters : None
Method : GET
*/
// To Get all books
Router.get("/",async(req,res)=>{
    const getAllBooks= await BookModel.find();
    return res.json({Books:getAllBooks})
})

/*
Route : /
Description : Get specific based on ISBN Number
Access : PUBLIC
Parameters : isbn
Method : GET
*/
//To Get one book based on ISBN number
Router.get("/is/:isbn",async(req,res)=>{

    const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn})
    // const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn)
    if(!getSpecificBook){
        return res.json({"error" : `No book found for the ISBN of ${req.params.isbn}`})
    }
    return res.json(getSpecificBook)
})

/*
Route : /c
Description : Get list of books based on category
Access : PUBLIC
Parameters : category
Method : GET
*/
//To get list of books based on Category
Router.get("/c/:category",async(req,res)=>{
    const getSpecificBooks=await BookModel.findOne({category : req.params.category})
    // const getSpecificBooks=database.books.filter((book)=>
    // book.category.includes(req.params.category)
    // )
    if(!getSpecificBooks){
        return res.json({"error" : `No book found for the ISBN of ${req.params.category}`})
    }
    return res.json(getSpecificBooks)

})

/*
Route : /a
Description : Get list of books based on authors
Access : PUBLIC
Parameters : author
Method : GET
*/
//To get list of books based on authors
Router.get("/a/:author",(req,res)=>{
    const getSpecificBooksAuthor=database.books.filter((book)=>
    book.authors.includes(parseInt(req.params.author))
    )
    if(getSpecificBooksAuthor.length===0){
        return res.json({"error" : `No book found for the ISBN of ${parseInt(req.params.author)}`})
    }
    return res.json(getSpecificBooksAuthor)

})

/*
Route : /book/new
Description : To Create new book
Access : PUBLIC
Parameters : 
Method : POST
*/
// To Create new book
Router.post("/new",async (req,res)=>{
    //Body
    try{
    const {newBook}=req.body
    await BookModel.create(newBook)
    //database.books.push(newBook)
    return res.json({Books:newBook,Message:"Book Added succesfully !!!"})
    }catch(error){
        return res.json({error:error.message})
    }
})

/*
Route : /book/update/
Description : Update title of a book
Access : PUBLIC
Parameters : isbn
Method : PUT
*/
Router.put("/update/:isbn",async (req,res)=>{
    
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn
    },
    {
        title:req.body.bookTitle
    },{
        new:true
    }
    )
    //For each - directly modify original array
    // database.books.forEach((book)=>{
    //     if(book.ISBN===req.params.isbn){
    //         book.title=req.body.bookTitle
    //         return
    //     }
    // })
    return res.json(updatedBook)
})

/*
Route : /book/author/update/
Description : Update title of a book
Access : PUBLIC
Parameters : ISBN
Method : PUT
*/
Router.put("/author/update/:isbn",async (req,res)=>{
    const updatedBookAuthor = await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn
    },
    {
        $addToSet:{
            authors:req.body.newAuthor
        }
    },
    {
        new:true
    }
    )
    
    const updatedNewAuthor = await AuthorModel.findOneAndUpdate({
        id:req.params.newAuthor
    },
    {
        $addToSet:{books:req.params.isbn}
    },
    {
        new:true
    }
    )
    //update the book database

    // database.books.forEach((book)=>{
    //     if(book.ISBN===req.params.isbn){
    //         return book.authors.push(req.body.newAuthor)
    //     }
    // })
    //update the author database
    // database.authors.forEach((author)=>{
    //     if(author.id===req.body.newAuthor){
    //         return author.name.push()
    //     }
    // })
    return res.json({Book:updatedBookAuthor,Author:updatedNewAuthor})
})

/*
Route : /book/delete
Description : Delete a book
Access : PUBLIC
Parameters : ISBN
Body : 
Method : DELETE
*/
Router.delete("/delete/:isbn",async (req,res)=>{
    
    const updatedBookDatabase=await BookModel.findOneAndDelete({ISBN:req.params.isbn})
    // const updatedBookDatabase = database.books.filter((book)=>req.params.isbn!==book.ISBN)
    // database.books=updatedBookDatabase
     return res.json({Books:updatedBookDatabase,Message:"Book deleted successfully"})
})

/*
Route : /book/delete/author
Description : Delete a author from book
Access : PUBLIC
Parameters : ISBN,author id
Body : 
Method : DELETE
*/
Router.delete("/delete/author/:isbn/:authorID",async (req,res)=>{
    
    const updatedBook=await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn
    },
    {
        $pull:{
            authors:parseInt(req.params.authorID)
        }
    },{
        new:true
    })
    // database.books.forEach((book)=>{
    //     if(req.params.isbn===book.ISBN){
    //         const newAuthorList = book.authors.filter((author)=>author!== parseInt(req.params.authorID))
    //         book.authors=newAuthorList
    //     return
    //     }
        
    // })
    //update the author database
    const updatedAuthor=await BookModel.findOneAndUpdate({
        id:parseInt(req.params.authorID)
    },
    {
        $pull:{
            ISBN:req.params.isbn
        }
    },
    {
        new:true
    }
    )

//     database.authors.forEach((author)=>{
//         if(author.id===req.params.authorID){
//             const newBooksList = author.books.filter((book)=>book.ISBN !== req.params.isbn)
//             author.books=newBooksList
//             return
//         }
//     })
//     return res.json(database.books)
// } )
      return res.json({Books:updatedBook,Authors:updatedAuthor})})

module.exports=Router