order = JSON.parse(localStorage.getItem('order'));
const checkout = document.getElementById('checkbod');
const checkfoot = document.getElementById('checkfoot');
const isKgArr = JSON.parse(localStorage.getItem('isKgArr'))
const creditoption = document.querySelectorAll("input[name=pay-meth]")
const card = document.getElementById("carddeets")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const submitbtn = document.getElementById("payport")
const body = document.getElementById("EvWrapper")
const form = document.getElementById("form")

function creditCard(){
    if(this.value=="card"){
        card.classList.add("show")
    }
    else{
        card.classList.remove("show")
    }

}

creditoption.forEach(radio=>radio.addEventListener('change',creditCard))



function DisplayOrderCheckOut(){
    for(i=0;i<order.length;i++){
        let tr= document.createElement('tr')
        const info=['<img src="'+order[i].img +'" alt="">',order[i].itemName, order[i].quantity,order[i].price] //pulls the items from order array
        for(let x=0;x<info.length;x++){
            let td= tr.appendChild(document.createElement('td'));
            td.innerHTML = info[x]
            if(x==2){
            if(isKgArr[i]){
                const kg =document.createTextNode(" KG")
                td.appendChild(kg)}
                console.log("ran")
            }
        }
        checkout.appendChild(tr)
    }
 
}   

function calculatePrice(tf){
    let totalPrice = 0;
    let rows = checkout.childNodes;
    let col;

    for(let i=1;i<rows.length;i++){
        col = rows[i].childNodes;
        console.log(col[2].innerText.split(" ")[0])
        totalPrice += Number(col[2].innerText.split(" ")[0])*Number(col[3].innerHTML)
    }
    tf.innerHTML = totalPrice
}

function DeliveryDate(){
    let date = new Date() 
    let minDay = date.getDate()+2;
    let maxDay = date.getDate()+2;
    let Month = date.getMonth()
    if(minDay>31 && maxDay>31){
        Minday -= 31;
        maxDay -= 31;
        Month = date.getMonth()+1
    }
    const minDate = `${months[Month]}  ${minDay} , ${date.getFullYear()} `
    const maxDate = `${months[Month]}  ${minDay} , ${date.getFullYear()} `
    const message = `Thank you for Ordering! <br> Your order will be delivered between ${minDate} and ${maxDate}`
    body.innerHTML = message;
    body.classList.add("after")
    console.log(message)
}


DisplayOrderCheckOut();
calculatePrice(checkfoot);

form.addEventListener('submit',DeliveryDate)