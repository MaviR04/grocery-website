const prev = document.getElementById('prev-btn')
const next = document.getElementById('next-btn')
const slider = document.getElementById('inner-slider')

const ch_prev = document.getElementById('ch-prev')
const ch_next = document.getElementById('ch-nxt')
const ch_slider = document.getElementById('ch-inner-slider')

const dr_prev = document.getElementById('')


const itemwidth = 200
const padding = 10

function scrollonclick(prevbutton,nextbutton,inScroll){
    prevbutton.addEventListener('click',()=>{
        inScroll.scrollLeft -=(itemwidth+padding)
    })

    nextbutton.addEventListener('click',()=>{
        inScroll.scrollLeft  += (itemwidth+padding)
    })
}

scrollonclick(prev,next,slider)
scrollonclick(ch_prev,ch_next,ch_slider)


const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el)=> observer.observe(el));
hidleft.forEach((el)=>observer.observe(el))