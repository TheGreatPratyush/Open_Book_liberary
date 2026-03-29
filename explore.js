function card(aut,im,tit){

    let p = document.createElement("div")

    let img = document.createElement("img")
    img.src=`https://covers.openlibrary.org/b/id/${im}-M.jpg`
    img.style.height="auto"
    img.style.width="100%"
    img.style.objectFit="cover"
    p.appendChild(img)


    let book = document.createElement("p")
    book.innerHTML=tit
    p.appendChild(book)
    
    
    let author = document.createElement("p")
    author.innerHTML=aut
    p.appendChild(author)
    
    
    p.style.width="100%"
    p.style.border="1px solid black"
    p.style.padding="10px"
    
    return p 
}



let cards = document.getElementById("cards")
cards.style.display="grid"
cards.style.gap="20px"
cards.style.gridTemplateColumns="repeat(4,1fr)"


async function friction_books() {
    let a = await fetch("https://openlibrary.org/search.json?q=fiction")
    let p = await a.json()
    console.log(p)
    let data = p.docs.map((e)=>{
        let p = {}
        p["author"]=e.author_name[0]
        p["card_img"]= e.cover_i
        p["title"]=e.title
        return p 
    })
    data.forEach((e)=>{
        let p = card(e.author,e.card_img,e.title)
        cards.appendChild(p)
    })
}




friction_books()

