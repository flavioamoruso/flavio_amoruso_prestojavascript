let navbar=document.querySelector('#navbar');


window.addEventListener('scroll',()=>{
    let scrolled=window.scrollY
    if (scrolled>100) {
        navbar.classList.add('navbar-scroll')
    }else{
        navbar.classList.remove('navbar-scroll')
    }
})



fetch('./annunci.json').then((response)=>response.json()).then((data)=>{



let inputCategory=document.querySelector('#inputCategory')
let containerCard=document.querySelector('#containerCard')

// creazione radioButton
function radioCreate() {
    let categories=data.map((annuncio)=>annuncio.category)
    let uniqueCategories= new Set(categories)
    uniqueCategories.forEach((categoria)=>{
        let div=document.createElement('div')
        div.innerHTML=`
        <input class="form-check-input" type="radio" name="categoria" id="${categoria}">
        <label class="form-check-label" for="${categoria}">
        ${categoria}
        </label>`
        inputCategory.appendChild(div)
    })
}

radioCreate()


let radioBtn=document.querySelectorAll('.form-check-input')

// card mostrate
function showCards(array) {
    array.forEach((annuncio)=>{
        let div=document.createElement('div')
        div.classList.add('col-6', 'col-md-4', 'my-3')
        div.innerHTML=`
        <div style='background-image:linear-gradient(transparent,rgba(0, 0, 0, 0.495)),url(${annuncio.img})'class='card-img card border border-4 border-primary'>
        <h1>${annuncio.name}</h1>
        <p class='category'>${annuncio.category}
        <h3 class='prices'>${annuncio.price}€</h3>
        </div>`
        
        containerCard.appendChild(div)
    })
}

showCards(data)


// funzione per filtrare le categorie

function filterByCategories(array){
    let btnChecked = Array.from(radioBtn).find((button)=> button.checked)
    let categoria = btnChecked.id
    if(categoria != 'All'){
        let filtered = array.filter((annuncio)=> annuncio.category == categoria)
        containerCard.innerHTML = ``
        return filtered
    }else{
        return array
    }
}



radioBtn.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        globalFilter()
    })
})


// -------------------------
// per prezzo

let priceInput = document.querySelector('#priceInput')
let priceValue = document.querySelector('#priceValue')



function setPriceInput(){
let prices = data.map((annuncio)=> Number(annuncio.price))
prices.sort((a,b)=> a - b)
let maxPrice = prices.pop()
priceInput.max = maxPrice
priceInput.value = maxPrice
priceValue.innerHTML = maxPrice

}


setPriceInput()


function filterByPrice(array) {
let filtered = array.filter((annuncio)=>Number(annuncio.price) <= priceInput.value)
containerCard.innerHTML = ``
return filtered
}


priceInput.addEventListener('input', ()=>{
priceValue.innerHTML = priceInput.value
globalFilter()
})

// ----------------------------------------------------
// filtro per parola

let wordInput = document.querySelector('#wordInput')
let wordButton=document.querySelector('#wordButton')

function filterByWord(array){

let filtered = array.filter((annuncio)=> annuncio.name.includes(wordInput.value))
containerCard.innerHTML = ``
return filtered
}

wordButton.addEventListener('click', ()=>{
globalFilter()
})

// -----------------------------------------------------
// filtro globale

function globalFilter(){
let filtratiPerCategoria = filterByCategories(data) //annunci filtrati per categoria
let filtratiPerPrezzo = filterByPrice(filtratiPerCategoria) //annunci filtrati per categoria e prezzo
let filtratiPerParola = filterByWord(filtratiPerPrezzo) //annunci filtrati per categoria prezzo e parola
showCards(filtratiPerParola)
}



















})

