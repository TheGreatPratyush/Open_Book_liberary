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
        <div class="navi_com" id="darkBtn">Dark</div>
    `
    outerDiv.appendChild(p)

    main.appendChild(outerDiv)
}
header()

function searchBar(){
    let p = document.createElement("div")
    p.innerHTML=`
    <div id="head">
        <h2>Find Your Next Book</h2>
        <h4>Search From thousands of books instantly</h4>
    </div>
    <div id="searchBar">
        <input type="text" placeholder="Search by title , author .." id="input">
        <button id="searchBtn">Search</button>
    </div>`
    main.appendChild(p)
}
searchBar()

let cards = document.createElement("div")
cards.setAttribute("id","cards")
main.appendChild(cards)

function card(book){
    let p = document.createElement("div")
    p.classList.add("card")

    let img = document.createElement("img")
    img.src=`https://covers.openlibrary.org/b/id/${book.card_img}-M.jpg`
    p.appendChild(img)

    let title = document.createElement("p")
    title.innerHTML=book.title
    p.appendChild(title)

    let author = document.createElement("p")
    author.innerHTML=book.author
    p.appendChild(author)

    p.addEventListener("click", ()=>{
        showPopup(book)
    })

    return p 
}

async function friction_books(parame){
    let a = await fetch(`https://openlibrary.org/search.json?q=${parame}`)
    let p = await a.json()

    if(p.docs.length==0){
        alert("No results")
        return
    }

    cards.innerHTML=""

    let data = p.docs.map((e)=>({
        author: e.author_name?.[0],
        card_img: e.cover_i,
        title: e.title,
        year: e.first_publish_year,
        subject: e.subject?.slice(0,3),
        key: e.key
    }))

    data.forEach((e)=>{
        cards.appendChild(card(e))
    })
}

function setupSearch(){
    let input = document.getElementById("input")
    let btn = document.getElementById("searchBtn")

    btn.addEventListener("click", ()=>{
        if(input.value==="") return alert("Enter something")
        friction_books(input.value)
    })
}
setupSearch()

async function showPopup(book){
    let res = await fetch(`https://openlibrary.org${book.key}.json`)
    let data = await res.json()

    let desc = data.description?.value || data.description || "No description"

    let popup = document.createElement("div")
    popup.id="popup"

    popup.innerHTML=`
        <div id="popupBox">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.year || "N/A"}</p>
            <p>${book.subject?.join(", ") || "N/A"}</p>
            <p>${desc}</p>
            <button id="closeBtn">Close</button>
        </div>
    `

    document.body.appendChild(popup)

    document.getElementById("closeBtn").onclick=()=>popup.remove()
}

friction_books("fiction")

/* DARK MODE */
let darkBtn = document.getElementById("darkBtn")

if(localStorage.getItem("theme")==="dark"){
    document.documentElement.classList.add("dark")
    darkBtn.innerText="Light"
}

darkBtn.onclick=()=>{
    document.documentElement.classList.toggle("dark")

    if(document.documentElement.classList.contains("dark")){
        localStorage.setItem("theme","dark")
        darkBtn.innerText="Light"
    }else{
        localStorage.setItem("theme","light")
        darkBtn.innerText="Dark"
    }
}