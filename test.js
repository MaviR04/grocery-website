/*A bit of background about the design of this whole application

So since there would be a lot of items that cpuld be added to the cart instead of making them individual objects or variables
which would increase the amount of lines and the amount of work i needed to do ive decided to make use of arrays for storing
the items, with the items themselves being objects.
*/





const order = []
let item_temp
let names = document.querySelectorAll('.name')
let prices = document.querySelectorAll('.price')
let count = document.querySelectorAll('.counter')
const images = document.querySelectorAll('img')
let button = document.querySelectorAll('.btn')
let itemCount =button.length;
let delbuttons = []
let table=document.getElementById('cart')
let tb = document.getElementById('cartbod')
let tf = document.getElementById('cartfoot')
const submitBtn = document.getElementById('submit')
let initial = false
let picked = []
const addFavbtn = document.getElementById('addfav')
const loadFavbtn = document.getElementById('loadfav')
let isKgArr = [];



//constructor for OrderItem object  
function orderItem(itemname,quantity,price,image){
    if(quantity<1){quantity=1;alert("please enter a valid quantity")}
    this.itemName = itemname;
    this.quantity = quantity;
    this.price = price;
    this.img = image
}

//function to create new objects temporarily and push them to to order array(for permanent storage)
function addItem(itemname,quantity,price,image){
	item_temp = new orderItem(itemname,quantity,price,image);  
    order.push(item_temp);
}

//this func pulls the value from the DOM and then passes them to the addItem function to create the lists
function pullItem(i){
    let name = names[i].innerHTML;  
    let quantity = count[i].value;
    let price = prices[(i)].innerHTML;
    let image = images[i].getAttribute("src");
    addItem(name,quantity,price,image);
}

//sleep function 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//addding let event listeners to all the buttons

let xs = 0
let DBcount = 0
let displaycount = 0


function MainRuntime(){
    for(let i=0;i<itemCount;i++){
        picked[i]=false
        button[i].addEventListener('click',function(e){
            if(picked[i]==false){
                let caller = e.target                                               //this makes sure that you can only press buttons once to avoid dupe items  
                pullItem(i);
                picked[i]=true
                DisplayOrder(tb,caller)
                removeItem(DBcount,i)
                calculatePrice(tf)
                DBcount++
            }
        })
    }    
}

window.addEventListener("load",MainRuntime)



function SubmissionRedirect(){
    let submitted = saveOrder();
    if(submitted){
    window.location.href="check.html"
    }
}

submitBtn.addEventListener('click',SubmissionRedirect)

addFavbtn.addEventListener('click',function(){
    saveOrder()
    localStorage.setItem('picked',JSON.stringify(picked))
    localStorage.setItem('favOrder',JSON.stringify(order))

})


loadFavbtn.addEventListener('click',function(){
    loadFav(tb,tf)
})


function isKg(e,td,tr){
    console.log(e.parentElement)
    let buttonclass = e.parentElement.classList
    console.log(buttonclass)
    if(buttonclass.contains('kg')){
        console.log("buttonclass there")
        const kg =document.createTextNode(" KG")
        td.appendChild(kg)
        tr.classList.add('float')
        isKgArr.push(true)
    }
    else{
        isKgArr.push(false)
    }
    console.log(isKgArr)
}

function isKgonLoad(i,td,tr){
    if(isKgArr[i]){
        const kg =document.createTextNode(" KG")
        td.appendChild(kg)
        tr.classList.add('float')
    }
}


//where the magic happens

function DisplayOrder(tb,e){
    let tr= document.createElement('tr')
    const info=['<img src="'+order[displaycount].img +'" alt="">', order[displaycount].itemName, order[displaycount].quantity,order[displaycount].price] //pulls the items from order array
    for(let x=0;x<info.length;x++){
        let td= tr.appendChild(document.createElement('td'));

        if(x==2){
            let qvalue = document.createElement('input')
            qvalue.setAttribute('type','number')
            qvalue.setAttribute('min','1')
            qvalue.classList.add('tableCounter')
            td.appendChild(qvalue)
            if(e){                                         //checks if the value should is a whole quantity or if its KG this one only runs if the event is passed as an parameter                                                         
                isKg(e,td,tr)                              //which is only when the user is initially filling up his cart
            }
            else{
                isKgonLoad(displaycount,td,tr)            //alternate version of the check runs if e is not passed aka when load favourites is clicked
            }                           
            qvalue.value = info[2]
            qvalue.addEventListener('input',function(){calculatePrice(tf);})
        }

        else{
        td.innerHTML = info[x]
        }

        if(x>=3){
            let delbutton = document.createElement('button')
            delbutton.innerHTML = 'X'
            let delcon = document.createElement('td')
            delcon.appendChild(delbutton)
            tr.appendChild(delcon)
            delbuttons.push(delbutton)
        }
    }
    tr.style.animation = "LoadIn 0.5s"
    tb.appendChild(tr)
 
    displaycount++
    console.log(displaycount)
}

async function removeItem(i,x){
    delbuttons[i].addEventListener('click',async function(event){
        let gyatt = event.target
        gyatt.parentElement.parentElement.style.animation = "LoadOut 280ms"
        await sleep(260)                                              //stops the instant removal of the table row 
        gyatt.parentElement.parentElement.remove()       //remove the table row(goes up two elements)
        picked[x] = false                  //resets the flag so that the item can be picked again
        console.log(picked)
        DBcount--                          
        delbuttons.splice(i,1)            //removes delbuttons from the array in order for the function to actually work
        if(tb.childElementCount==0){                  //here to fix a bug that occurs where delbuttons has one button remaining even though its should be empty
            delbuttons.length = 0;
        }
        calculatePrice(tf)
        console.log(DBcount,'in func')
        console.log(delbuttons)

    })
}

function saveOrder(){
    order.length = 0;
    let rows = tb.childNodes;
    let col;

    for(let i=1;i<rows.length;i++){
        col = rows[i].childNodes;
        addItem(col[1].innerHTML,col[2].firstChild.value,col[3].innerHTML,col[0].childNodes[0].src);
    }
    if(order.length == 0){
        alert("Hey, your order seems to be empty. Try adding some items!")
    }
    else{
    localStorage.setItem('order',JSON.stringify(order))
    localStorage.setItem('isKgArr',JSON.stringify(isKgArr))
    console.log(order)
    return true
    }
}

function calculatePrice(tf){
    let totalPrice = 0;
    let rows = tb.childNodes;
    let col;

    for(let i=1;i<rows.length;i++){
        col = rows[i].childNodes;
        console.log(col)
        if(rows[i].classList.contains('float')){
            totalPrice += Number(col[2].firstChild.value)*Number(col[3].innerHTML)
        }
        else{
            totalPrice += Number(Math.trunc(col[2].firstChild.value))*Number(col[3].innerHTML)
            col[2].firstChild.value = Math.trunc(col[2].firstChild.value)
        }
        console.log(totalPrice)
    }
    tf.innerHTML = totalPrice
}

function loadFav(tb){ 
    displaycount = 0;
    order = JSON.parse(localStorage.getItem('favOrder'))
    picked = JSON.parse(localStorage.getItem('picked'))
    isKgArr = JSON.parse(localStorage.getItem('isKgArr'))
    for(i=0;i<order.length;i++){
    DisplayOrder(tb)
    removeItem(i,i)
    calculatePrice(tf)
    DBcount++
    }   
}




