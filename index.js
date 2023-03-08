import { menuArray } from './data.js'

const checkout = document.getElementById("checkout")
const modalForm = document.getElementById("modal-form")
const modalCloseBtn = document.getElementById('modal-close-btn')
let checkoutArray = []
let checkoutInner = ""

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if (e.target.id === "complete-btn")
        displayModal()
})



modalForm.addEventListener("submit", function(e){
     e.preventDefault()

    const payFormData = new FormData(modalForm)
    const fullName = payFormData.get('fullName')   

    document.getElementById("modal").innerHTML = 
                                // `<div class="checkout-comfirmation-wrapper container">
                                    `<p class="checkout-comfirmation">Thanks, ${fullName}!<br>Your order is on its way!</p>`
                                // </div>
    
    // document.getElementById("modal").style.display= "none"
    checkoutArray = []
})



function displayModal(){
    document.getElementById("modal").style.display = "inline"
    modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})
}



function addItem(itemId) {
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    let checkoutItem = { name: targetItemObj.name, price: targetItemObj.price, id: targetItemObj.id}
    checkoutArray.push(checkoutItem)
   render()
}


function removeItem(itemId) {
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
       const index = checkoutArray.findIndex(x => x.id == itemId)
    checkoutArray.splice(index,1)
    render()
}

function getMenuHtml(){
    let menuHtml = ''
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="item">
            <div class="item-inner">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-detail">
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                    <span class="add-item" data-add="${item.id}">+</span>
            </div>        
        </div>
        `
    })
    return menuHtml
}



function getOrderItemsHtml(){
    const totalPrice = checkoutArray.reduce(function (accumulator, food){
        return accumulator + food.price;
    }, 0);
    
    let checkout = ""
    let checkoutInner = ""
    


    if (totalPrice){
         checkoutArray.forEach(function(orderItem){
        checkoutInner +=`
                    <div class="checkout-items-container">
                        <p>${orderItem.name}</p>
                        <button class="checkout-remove-btn" data-remove="${orderItem.id}">REMOVE</button>
                        <p class="checkout-price">$${orderItem.price}</p>
                    </div>
                `
        
    })
        checkout = `
                        <p class="checkout-upper">Your Order:</p>
                            <div id="checkout-items">
                                ${checkoutInner}
                            </div>
                        <div class="checkout-total">
                            <p class="checkout-price-title">Total Price</p>
                            <p id="checkout-total">$${totalPrice}</p>
                        </div>
                        <button class="complete-btn" id="complete-btn">Complete Order</button>
                    </div>
    `
    }
    return checkout
}

function render(){
    document.getElementById('menu').innerHTML = getMenuHtml()
    document.getElementById('checkout').innerHTML = getOrderItemsHtml()
}

render()
