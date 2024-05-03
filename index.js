const carousel=document.getElementById('list');

const padding=10;
const itemwidth=1230;



carousel.addEventListener('click',()=>{
    carousel.scrollLeft += itemwidth+padding;

    if (carousel.scrollLeft>1245){
        console.log(carousel.scrollLeft)
        carousel.scrollTo(0,0);
    }
});

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        }
        


    })
},{ threshold: 0.5
})

const hiddenElements = document.querySelectorAll('.hidden');
const slideleft =document.querySelectorAll('.commentWrapper');


slideleft.forEach((el)=> observer.observe(el));
hiddenElements.forEach((el)=> observer.observe(el));


