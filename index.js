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