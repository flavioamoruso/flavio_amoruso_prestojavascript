let titolo=document.querySelector('h2')
let p=document.querySelectorAll('p')
let btn=document.querySelector('button')
let navbar=document.querySelector('#navbar');

// title class
titolo.classList.add('titolo')


    btn.addEventListener('click',()=>{
    p.forEach((el)=>{
        el.classList.toggle('p')

    })
        
    })

    // evento scroll
window.addEventListener('scroll',()=>{
    let scrolled=window.scrollY
    if (scrolled>100) {
        navbar.classList.add('navbar-scroll')
    }else{
        navbar.classList.remove('navbar-scroll')
    }
})


