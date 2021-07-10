let books=[{
    ISBN:"12345",
    title:"Getting started with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["programming"]
},
{
    ISBN:"123451",
    title:"Getting started with Python",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["fiction","programming"]
}]

const authors = [{
    id:1,
    name:"srikanth",
    ISBN:["12345"]
},
{
    id:2,
    name:"prashanth",
    ISBN:["12345"]
}
]

const publications = [{
    id:1,
    name:"Chakra",
    books:["12345"]
},
{
    id:2,
    name:"Python",
    books:["12445"]
}
]

module.exports={books,authors,publications}