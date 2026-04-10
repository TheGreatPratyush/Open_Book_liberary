let main = document.getElementById("main")

let currentPage = 1
let currentQuery = "fiction"
let isFavoritesView = false

function header(){
    let div = document.createElement("div")
    div.id="navi"

    div.innerHTML=`
        <div><b>BookFinder</b></div>
        <div id="navi_sub">
            <div class="navi_com" onclick="location.href='index.html'">Home</div>
            <div class="navi_com">Explore</div>
            <div class="navi_com" id="favBtn">Favourites</div>
            <div class="navi_com" id="darkBtn">Dark</div>
        </div>
    `
    main.appendChild(div)
}
header()

function searchBar(){
    let div = document.createElement("div")
    div.innerHTML=`
    <div id="head">
        <h2>Find Your Next Book</h2>
        <h4>Search from thousands of books</h4>
    </div>

    <div id="searchBar">
        <input id="input" placeholder="Search books...">
        <button id="searchBtn">Search</button>
    </div>
    `
    main.appendChild(div)
}
searchBar()

let backBtn = document.createElement("button")
backBtn.innerText="⬅ Back to Explore"
backBtn.style.display="none"
backBtn.style.margin="20px"
main.appendChild(backBtn)

let cards = document.createElement("div")
cards.id="cards"
main.appendChild(cards)


function card(book){
    let favs = JSON.parse(localStorage.getItem("favs")) || []
    let isFav = favs.some(f=>f.key===book.key)

    let div = document.createElement("div")
    div.className="card"

    div.innerHTML=`
        <img src="https://covers.openlibrary.org/b/id/${book.cover}-M.jpg">
        <p><b>${book.title}</b></p>
        <p>${book.author || "Unknown"}</p>
        <button class="fav">${isFav ? "❤️" : "🤍"}</button>
    `

    div.querySelector(".fav").onclick=(e)=>{
        e.stopPropagation()
        toggleFav(book)
    }

    div.onclick=()=>showPopup(book)

    return div
}


async function fetchBooks(q,page=1){
    isFavoritesView = false
    backBtn.style.display="none"

    cards.innerHTML=""

    for(let i=0;i<8;i++){
        let sk = document.createElement("div")
        sk.className="skeleton"
        cards.appendChild(sk)
    }

    let res = await fetch(`https://openlibrary.org/search.json?q=${q}&page=${page}`)
    let data = await res.json()

    cards.innerHTML=""

    data.docs.slice(0,12).forEach(e=>{
        let book={
            title:e.title,
            author:e.author_name?.[0],
            cover:e.cover_i,
            key:e.key
        }
        cards.appendChild(card(book))
    })
}

fetchBooks(currentQuery)


document.getElementById("searchBtn").onclick=()=>{
    let val = document.getElementById("input").value
    if(!val) return
    currentQuery = val
    currentPage = 1
    fetchBooks(val)
}


async function showPopup(book){
    let res = await fetch(`https://openlibrary.org${book.key}.json`)
    let data = await res.json()

    let popup = document.createElement("div")
    popup.id="popup"

    popup.innerHTML=`
        <div id="popupBox">
            <h2>${book.title}</h2>
            <p><b>Author:</b> ${book.author}</p>
            <p>${data.description?.value || "No description available"}</p>
            <button id="close">Close</button>
        </div>
    `

    document.body.appendChild(popup)
    document.getElementById("close").onclick=()=>popup.remove()
}


function toggleFav(book){
    let favs = JSON.parse(localStorage.getItem("favs")) || []
    let exists = favs.find(f=>f.key===book.key)

    if(exists){
        favs = favs.filter(f=>f.key!==book.key)
    }else{
        favs.push(book)
    }

    localStorage.setItem("favs",JSON.stringify(favs))
    fetchBooks(currentQuery,currentPage)
}

document.getElementById("favBtn").onclick=()=>{
    let favs = JSON.parse(localStorage.getItem("favs")) || []

    isFavoritesView = true
    backBtn.style.display="block"

    cards.innerHTML=""

    if(favs.length===0){
        cards.innerHTML="<h2 style='text-align:center'>No Favorites Yet ❤️</h2>"
        return
    }

    favs.forEach(b=>cards.appendChild(card(b)))
}

backBtn.onclick=()=>{
    fetchBooks(currentQuery,currentPage)
}


let pagination = document.createElement("div")
pagination.id="pagination"

pagination.innerHTML=`
    <button id="prev">Prev</button>
    <button id="next">Next</button>
`

main.appendChild(pagination)

document.getElementById("prev").onclick=()=>{
    if(isFavoritesView) return
    if(currentPage>1){
        currentPage--
        fetchBooks(currentQuery,currentPage)
    }
}

document.getElementById("next").onclick=()=>{
    if(isFavoritesView) return
    currentPage++
    fetchBooks(currentQuery,currentPage)
}

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