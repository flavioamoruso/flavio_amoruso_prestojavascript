// cattura
let navbar=document.querySelector('#navbar');
let number1=document.querySelector('#number1')
let number2=document.querySelector('#number2')
let number3=document.querySelector('#number3')

// evento scroll
window.addEventListener('scroll',()=>{
    let scrolled=window.scrollY
    if (scrolled>100) {
        navbar.classList.add('navbar-scroll')
    }else{
        navbar.classList.remove('navbar-scroll')
    }
})


// number counter
// chiamate asincrone

// set interval
// clear interval

let confirm=true
function createInterval(n,element,time) {
  let counter=0
  let interval=setInterval(()=>{
    if (counter<n) {
      counter ++
      element.innerHTML=counter
    }else{
      clearInterval(interval)
    }
  },time)
  setTimeout(()=>{
  confirm=true
  },10000)
}



let observer=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
  if (entry.isIntersecting && confirm) {
    createInterval(500,number1,3);
    createInterval(30,number2,100);
    createInterval(1000,number3,3);
    confirm=false
  }
})
})

observer.observe(number1)




// swiper
var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });