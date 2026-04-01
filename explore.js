let main = document.getElementById("main")





function header(){
    let outerDiv= document.createElement("div")
    outerDiv.setAttribute("id","navi")

    let innerDiv1 = document.createElement("div")
    innerDiv1.innerHTML="BookFinder"
    outerDiv.appendChild(innerDiv1)

    let p = document.createElement("div")
    p.setAttribute("id","navi_sub")
    p.innerHTML=`
                <div class="navi_com">Home</div>
                <div class="navi_com">Explore</div>
                <div class="navi_com">Favourites</div>
                <div class="navi_com">Dark</div>`
    outerDiv.appendChild(p)

    main.appendChild(outerDiv)
    
    
}

header()

function searchBar(){
    let p = document.createElement("div")
    p.innerHTML=`
    <div id="head">
    <h2>Find Your Next Book</h2>
    <h4>Search From thousands of  books instantly</h4>
    </div>
    <div id="searchBar">
    <input type="text" placeholder="Search by title , author .." id="input">
    <button id="searchBtn">Search</button>
    </div>`
    main.appendChild(p)
}

searchBar()

let cards = document.getElementById("cards")
cards.style.display="grid"
cards.style.gap="20px"
cards.style.gridTemplateColumns="repeat(4,1fr)"
main.appendChild(cards)
cards.style.marginTop="100px"



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


async function friction_books(parame) {
    let a = await fetch(`https://openlibrary.org/search.json?q=${parame}`)
    let p = await a.json()
    console.log(p)
    if (p.docs.length==0){
        alert("Please Input Valid Search")
        return }
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

let input = document.getElementById("input")
let searchBtn= document.getElementById("searchBtn")
function searchBook(){
    let value=input.value
    if (value==""){
        alert("Please input ")
        return
    }
    cards.innerHTML=""
    friction_books(value)
}
searchBtn.addEventListener("click",searchBook)


friction_books("fiction")

