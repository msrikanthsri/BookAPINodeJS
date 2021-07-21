
const Router=require("express").Router()
const PublicationModel=require("../../Database/publications")
/*
Route : /publications
Description : Get All publications
Access : PUBLIC
Parameters : None
Method : GET
*/
// To Get all publications
Router.get("/",(req,res)=>{
    return res.json({Publications:database.publications})
})

/*
Route : /publications/p
Description : Get specific publications
Access : PUBLIC
Parameters : id
Method : GET
*/
// To Get specific authors
Router.get("/p/:id",(req,res)=>{
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
Router.get("/p/list/:id",(req,res)=>{
    const getListPublication=database.publications.filter((publication)=> publication.name===req.params.id)
    if(getListPublication.length===0){
        return res.json({"Error":`No Publication found for ID ${req.params.id}`})
    }
    return res.json(getListPublication)
})

/*
Route : /publications/new
Description : To create new publication
Access : PUBLIC
Parameters : 
Method : POST
*/
// To Create new author
Router.post("/new",(req,res)=>{
    //Body
    const {newPublication}=req.body
    database.publications.push(newPublication)
    return res.json({Publications:database.publications,Message:"Publication Added succesfully !!!"})
})




/*
Route : /publication/update/book
Description : Update/add new book to a publication
Access : PUBLIC
Parameters : ISBN
Body : 
Method : PUT
*/

Router.put("/update/book/:isbn",(req,res)=>{
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
Route : /publication/delete/book
Description : Delete a book from publications
Access : PUBLIC
Parameters : ISBN,publciation id
Body : 
Method : DELETE
*/
Router.delete("/delete/book/:isbn/:pubId",(req,res)=>{
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

module.exports=Router