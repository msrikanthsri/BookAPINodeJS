require("dotenv").config()

//Framework
//Import express
const { response } = require("express");
const express=require("express");
const mongoose=require("mongoose")

//Database
const database=require("./Database/index")

//Models
const BookModels = require("./Database/book")
const AuthorModels = require("./Database/author")
const PublicationModels = require("./Database/publications")

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

/*
Route : /
Description : Get All books
Access : PUBLIC
Parameters : None
Method : GET
*/
// To Get all books
shapeAI.get("/",(req,res)=>{
    return res.json({Books:database.books})
})

/*
Route : /
Description : Get specific based on ISBN Number
Access : PUBLIC
Parameters : isbn
Method : GET
*/
//To Get one book based on ISBN number
shapeAI.get("/is/:isbn",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn)
    if(getSpecificBook.length===0){
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
shapeAI.get("/c/:category",(req,res)=>{
    const getSpecificBooks=database.books.filter((book)=>
    book.category.includes(req.params.category)
    )
    if(getSpecificBooks.length===0){
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
shapeAI.get("/a/:author",(req,res)=>{
    const getSpecificBooksAuthor=database.books.filter((book)=>
    book.authors.includes(parseInt(req.params.author))
    )
    if(getSpecificBooksAuthor.length===0){
        return res.json({"error" : `No book found for the ISBN of ${parseInt(req.params.author)}`})
    }
    return res.json(getSpecificBooksAuthor)

})

/*
Route : /author/authors
Description : Get All Authors
Access : PUBLIC
Parameters : None
Method : GET
*/
// To Get all authors
shapeAI.get("/author/authors",(req,res)=>{
    return res.json({Books:database.authors})
})

/*
Route : /author/a
Description : Get specific author
Access : PUBLIC
Parameters : id
Method : GET
*/
// To Get specific authors
shapeAI.get("/author/a/:id",(req,res)=>{
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
shapeAI.get("/author/authors/:isbn",(req,res)=>{
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
shapeAI.get("/author/authorsBook/:name",(req,res)=>{
    const getAuthorsName=database.authors.filter((author)=>author.name.includes(req.params.name))
    if(getAuthorsName.length===0){
        return res.json({error:`No Author found for this ${req.params.name} name`})
    }
    return res.json(getAuthorsName) 
})


/*
Route : /publications
Description : Get All publications
Access : PUBLIC
Parameters : None
Method : GET
*/
// To Get all authors
shapeAI.get("/publications",(req,res)=>{
    return res.json({Books:database.publications})
})

/*
Route : /publications/p
Description : Get specific publications
Access : PUBLIC
Parameters : id
Method : GET
*/
// To Get specific authors
shapeAI.get("/publications/p/:id",(req,res)=>{
    const getSpecificPublication=database.publications.filter((publication)=> parseInt(req.params.id)===publication.id)
    if(getSpecificPublication.length===0){
        return res.json({"Error":`No Publication found for ID ${req.params.id}`})
    }
    return res.json(getSpecificPublication)
})

/*
Route : /publications/p/list
Description : To get a list of Publications based on book
Access : PUBLIC
Parameters : id
Method : GET
*/
// To Get specific authors
shapeAI.get("/publications/p/list/:id",(req,res)=>{
    const getListPublication=database.publications.filter((publication)=> publication.name===req.params.id)
    if(getListPublication.length===0){
        return res.json({"Error":`No Publication found for ID ${req.params.id}`})
    }
    return res.json(getListPublication)
})


//----------------------------------POST BOOK-------------------------

/*
Route : /book/new
Description : To Create new book
Access : PUBLIC
Parameters : 
Method : POST
*/
// To Create new book
shapeAI.post("/book/new",(req,res)=>{
    //Body
    const {newBook}=req.body
    database.books.push(newBook)
    return res.json({Books:newBook,Message:"Book Added succesfully !!!"})
})

/*
Route : /author/new
Description : To create author
Access : PUBLIC
Parameters : 
Method : POST
*/
// To Create new author
shapeAI.post("/author/new",(req,res)=>{
    //Body
    const {newAuthor}=req.body
    database.authors.push(newAuthor)
    return res.json({Books:database.authors,Message:"Author Added succesfully !!!"})
})

/*
Route : /publications/new
Description : To create new publication
Access : PUBLIC
Parameters : 
Method : POST
*/
// To Create new author
shapeAI.post("/publications/new",(req,res)=>{
    //Body
    const {newPublication}=req.body
    database.publications.push(newPublication)
    return res.json({Publications:database.publications,Message:"Publication Added succesfully !!!"})
})

/*
Route : /book/update/
Description : Update title of a book
Access : PUBLIC
Parameters : isbn
Method : PUT
*/
shapeAI.put("/book/update/:isbn",(req,res)=>{
    //For each - directly modify original array
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.title=req.body.bookTitle
            return
        }
    })
    return res.json(database.books)
})

/*
Route : /book/author/update/
Description : Update title of a book
Access : PUBLIC
Parameters : ISBN
Method : PUT
*/
shapeAI.put("/book/author/update/:isbn",(req,res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            return book.authors.push(req.body.newAuthor)
        }
    })
    //update the author database
    database.authors.forEach((author)=>{
        if(author.id===req.body.newAuthor){
            return author.name.push()
        }
    })

})

/*
Route : /publication/update/book
Description : Update/add new book to a publication
Access : PUBLIC
Parameters : ISBN
Body : 
Method : PUT
*/

shapeAI.put("/publication/update/book/:isbn",(req,res)=>{
    database.publications.forEach((publication) => {
        if(publication.id===req.body.pubId){
            return database.publications.push(req.params.isbn)
        }

    });
    database.books.forEach(book => {
        if(book.ISBN===req.params.isbn){
            book.publication=req.body.pubId;
            return book.publication
        }
    });
    return res.json({publication:database.publications,Books:database.books,Message:"Successfully updated"})
})



/*
Route : /book/delete
Description : Delete a book
Access : PUBLIC
Parameters : ISBN
Body : 
Method : DELETE
*/
shapeAI.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase = database.books.filter((book)=>req.params.isbn!==book.ISBN)
    database.books=updatedBookDatabase
    return res.json({Books:database.books,Message:"Book deleted successfully"})
})

/*
Route : /book/delete/author
Description : Delete a author from book
Access : PUBLIC
Parameters : ISBN,author id
Body : 
Method : DELETE
*/
shapeAI.delete("/book/delete/author/:isbn/:authorID",(req,res)=>{
    database.books.forEach((book)=>{
        if(req.params.isbn===book.ISBN){
            const newAuthorList = book.authors.filter((author)=>author!== parseInt(req.params.authorID))
            book.authors=newAuthorList
        return
        }
        
    })
    //update the author database
    database.authors.forEach((author)=>{
        if(author.id===req.params.authorID){
            const newBooksList = author.books.filter((book)=>book.ISBN !== req.params.isbn)
            author.books=newBooksList
            return
        }
    })
    return res.json(database.books)
} )

/*
Route : /publication/delete/book
Description : Delete a book from publications
Access : PUBLIC
Parameters : ISBN,publciation id
Body : 
Method : DELETE
*/
shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
    database.publications.forEach((publication)=>{
        if(publication.id===req.params.pubId){
            const newBooksList=publication.books.filter((book)=>book!==req.params.isbn)
            publication.books=newBooksList
            return
        }
    })
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=0
            return
        }


    })
    return res.json({Books:database.books,publications:database.publications})
})



shapeAI.listen(3000,()=>console.log("Hey u are listening at 3000"));