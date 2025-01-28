let items = [];

var table1 = jQuery('#example1').DataTable();
var showingToast = document.getElementById('showtoasts');

if(localStorage.getItem('banklogs')){
    if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {

        items = JSON.parse(localStorage.getItem('banklogs'));
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

        items.map(data=>{
            var image = `<td><img src=${data.image}></td>`
            var balance = `<td class="btn-balance">${data.balance}</td>`
            var price = `<td class="btn-price">${data.price}</td>`
            var remove = `<td><button class="btn-cloze btn-remove"></button></td>`
            var account = `<td>${data.account}</td>`
            var website = `<td>${data.website}</td>`
            var info1 = `<td>${data.info1}</td>`
            var info2 = `<td>${data.info2}</td>`
            var info3 = `<td>${data.info3}</td>`
            var info4 = `<td>${data.info4}</td>`
            var info5 = `<td>${data.info5}</td>`
            
            table1.row.add([
                image,
                balance,      
                account,   
                price,
                remove,
                info1,   
                info2,   
                info3,   
                info4,   
                info5,   
                website,      
            ]).draw();
        });

        var removeFromCartButtons = document.getElementsByClassName('btn-remove');
        for(var i = 0; i <removeFromCartButtons.length; i++){
            var button = removeFromCartButtons[i];
            button.addEventListener('click', removeCartItem)
        }
        updateCartTotal();
    } else {
        document.getElementById('cartlength').style.display = 'none';
    }
} else {
    document.getElementById('cartlength').style.display = 'none';
}

showingToast.addEventListener('click', showThis);   
var joe = localStorage.getItem('banklogs')

function showThis() {
    if(joe && (JSON.parse(joe).length) > 0) {
        window.location.assign('download'); 
    } else { 
        var shortCutFunction = 'success'; var msg = `Your cart is empty... <br> add bank logs to cart. <hr class="to-hr hr15-bot">`; 
        toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; $('#profileModal').modal('hide'); 
    }
}

$('#exampleModal').on('show.bs.modal', function (event) {
    "use strict";
    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var addToCartButtons = logsContainer.getElementsByClassName('butn');
    var modal = $(this);

    for(var i = 0; i <addToCartButtons.length; i++){
        var btn = addToCartButtons[i];
        var btz = addToCartButtons[i].children[0];
        btn.addEventListener('click', addToCartClicked);
        btz.addEventListener('click', addToCartClicked2);
    }
    
    function addToCartClicked(event){
        var btn = event.target;
        var image = btn.parentElement.parentElement.children[0].children[1].src;
        var balance = btn.parentElement.parentElement.children[0].children[0].innerText;
        var website = btn.parentElement.children[0].innerText;
        var info1 = btn.parentElement.children[1].innerText;
        var info2 = btn.parentElement.children[2].innerText;
        var info3 = btn.parentElement.children[3].innerText;
        var info4 = btn.parentElement.children[4].innerText;
        var info5 = btn.parentElement.children[5].innerText;
        var account = btn.parentElement.children[6].innerText;
        
        modal.find(".modal-title").text("Balance: " + balance);
        document.getElementById('monez').innerHTML = ` 
            Buy : $${parseFloat((balance.replace("$", "").replace(",", "") /  42)).toFixed(0)} <img src=${image}>`;
        modal.find(".website p").text(website);
        modal.find(".info1 p").text(info1);
        modal.find(".info2 p").text(info2);
        modal.find(".info3 p").text(info3);
        modal.find(".info4 p").text(info4);
        modal.find(".info5 p").text(info5);
        modal.find(".modal-img").attr("src", image);
        modal.find(".account p").text(account);

        setTimeout(() => { addToCartClick() }, 600);
    }

    function addToCartClicked2(event){
        var btn = event.target;
        var image = btn.parentElement.parentElement.parentElement.children[0].children[1].src;
        var balance = btn.parentElement.parentElement.parentElement.children[0].children[0].innerText;
        var website = btn.parentElement.parentElement.children[0].innerText;
        var info1 = btn.parentElement.parentElement.children[1].innerText;
        var info2 = btn.parentElement.parentElement.children[2].innerText;
        var info3 = btn.parentElement.parentElement.children[3].innerText;
        var info4 = btn.parentElement.parentElement.children[4].innerText;
        var info5 = btn.parentElement.parentElement.children[5].innerText;
        var account = btn.parentElement.parentElement.children[6].innerText;
        
        modal.find(".modal-title").text("Balance: " + balance);
        document.getElementById('monez').innerHTML = ` 
            Buy : $${parseFloat((balance.replace("$", "").replace(",", "") /  42)).toFixed(0)} <img src=${image}>`;
        modal.find(".website p").text(website);
        modal.find(".info1 p").text(info1);
        modal.find(".info2 p").text(info2);
        modal.find(".info3 p").text(info3);
        modal.find(".info4 p").text(info4);
        modal.find(".info5 p").text(info5);
        modal.find(".modal-img").attr("src", image);
        modal.find(".account p").text(account);

        setTimeout(() => { addToCartClick() }, 600);
    }
})



var addToCartButtons = document.getElementsByClassName('money');
for(var i = 0; i <addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClick)
}


function addToCartClick(event) {
    var button = document.getElementsByClassName('money')[0];
    var pri = button.innerText;
    var pric = pri.replace('Buy : ','');
    var price3 = 'Price: '+  pric;
    var price = price3.substring(0, price3.length - 1);
    var balance = button.parentElement.parentElement.parentElement.children[0].children[1].innerText;
    var website = button.parentElement.parentElement.children[0].children[0].innerText;
    var info1 = button.parentElement.parentElement.children[1].children[0].innerText;
    var info2 = button.parentElement.parentElement.children[2].children[0].innerText;
    var info3 = button.parentElement.parentElement.children[3].children[0].innerText;
    var info4 = button.parentElement.parentElement.children[4].children[0].innerText;
    var info5 = button.parentElement.parentElement.children[5].children[0].innerText;

    var image = button.parentElement.parentElement.parentElement.children[0].children[0].src;
    var accoun = button.parentElement.parentElement.children[6].children[0].innerText;

    if(accoun.includes('ACCOUNT')) {
        var account = accoun.replace(' ACCOUNT]',']');
    } else if(accoun.includes('PACKAGE')) {
        var account = accoun.replace(' PACKAGE]',']');
    }

    addItemToCart(price, balance, account,website,image,info1,info2,info3,info4,info5);
    updateCartTotal();

    $('#exampleModal').modal('hide');

    setTimeout(() => { 
        window.location.assign('home');
    }, 2000);            
}


function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var price = cartItem.children[3].innerText;
    var balance = cartItem.children[1].innerText;
    var account = cartItem.children[2].innerText;
    var website = cartItem.children[10].innerText;
    var image = cartItem.children[0].children[0].src;
    var info1 = cartItem.children[5].innerText;
    var info2 = cartItem.children[6].innerText;
    var info3 = cartItem.children[7].innerText;
    var info4 = cartItem.children[8].innerText;
    var info5 = cartItem.children[9].innerText;
    var remove = `<td><button class="btn-cloze btn-remove"></button></td>`

    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4,info5);
    buttonClicked.parentElement.parentElement.remove();
    
    updateCartTotal2();

    table1.row(({
        image,
        balance,      
        account,   
        remove,
        price,
        info1,   
        info2,   
        info3,   
        info4,   
        info5,     
        website,      
    })).remove();

    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var singleLog = logsContainer.getElementsByClassName('butn');
    for(var i = 0; i < singleLog.length; i++){
        if((singleLog[i].innerText) == price.replace('Price: ', 'In Cart ') && (singleLog[i].parentElement.children[0].innerHTML) == website){
            singleLog[i].innerHTML = `
                ${price.replace('Price: ', 'Buy: ')}
            `;
            singleLog[i].classList.remove('in-cart');
            var bunist = singleLog[i].parentElement.parentElement;
            bunist.classList.remove('display-nones');
            singleLog[i].disabled = false;
        } 
    }

    window.location.reload();
}

function addItemToCart(price, balance, account,website, image,info1,info2,info3,info4,info5){
    var image1 = `<td><img src=${image}></td>`
    var balance1 = `<td class="btn-balance">${balance}</td>`
    var price1 = `<td class="btn-price">${price}</td>`
    var remove1 = `<td><button class="btn-cloze btn-remove"></button></td>`
    var account1 = `<td>${account}</td>`
    var website1 = `<td>${website}</td>`
    var info11 = `<td>${info1}</td>`
    var info21 = `<td>${info2}</td>`
    var info31 = `<td>${info3}</td>`
    var info41 = `<td>${info4}</td>`
    var info51 = `<td>${info5}</td>`

    if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){
        var cartItemNames = JSON.parse(localStorage.getItem('banklogs'));
        for(var i = 0; i < cartItemNames.length; i++) {
            if(cartItemNames.length > 0.5) {
                var shortCutFunction = 'success';   var msg = `
                    Cart is full, checkout the <br> bank log in cart.  <hr class="to-hr hr15-bot">  
                    <hr class="hr10-nil">
                `;
                toastr.options =  {
                    closeButton: true, debug: false, newestOnTop: true, progressBar: true,
                    positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
                }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
                return
            }
            if(cartItemNames.length > 2.5) {
                document.getElementsByClassName('dataTables_paginate')[0].style.display = 'block';
                document.getElementsByClassName('dataTables_length')[0].style.display = 'block'
            }
        }
    } 

    addToLocalStorage(price, balance, account,website,image,info1,info2,info3,info4,info5);

    table1.row.add([
        image1,
        balance1,      
        account1, 
        price1,  
        remove1,
        info11,   
        info21,   
        info31,   
        info41,   
        info51,   
        website1,      
    ]).draw();

    updateCartTotal();

    var removeFromCartButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i <removeFromCartButtons.length; i++){
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
}


function addToLocalStorage(price, balance, account,website, image,info1,info2,info3,info4,info5){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5
    }
    items.push(item);
    localStorage.setItem('banklogs', JSON.stringify(items));
    if(localStorage.getItem('banklogs')){
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);
        document.getElementById('cartlength').style.display = 'block';
    }
}

function removeItemFromCart(price, balance,account,website,image,info1,info2,info3,info4,info5){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5
    }
    function checkAdult(items) {
        return JSON.stringify(items) !== JSON.stringify(item)
    }
    localStorage.setItem('banklogs', JSON.stringify(items.filter(checkAdult)));
    items = items.filter(checkAdult);
}

function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    document.getElementById('theno1').innerHTML =  'Cart Total: $' + total.toLocaleString();

    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var singleLog = logsContainer.getElementsByClassName('butn');
    for(var i = 0; i < singleLog.length; i++){
        let cart = JSON.parse(localStorage.getItem('banklogs'));
        cart.map(data=>{
            data.price3 = data.price.replace('Price: ','');
            if((singleLog[i].parentElement.parentElement.children[0].children[0].innerHTML == data.balance.replace('Balance: ', '')) && (singleLog[i].parentElement.children[0].innerHTML) == data.website) {
                singleLog[i].classList.add('in-cart');
                singleLog[i].innerHTML = `Cart ${data.price.replace('Price: ', '')} <img src="co.png"> `;
                var bunist = singleLog[i].parentElement.parentElement;
                bunist.classList.add('display-nones');
                
                singleLog[i].removeAttribute('data-bs-target');
                singleLog[i].addEventListener('click', () => {
                    $('#profileModal').modal('show');
                });
            } 
        });
    }

    var id = setInterval(frame, 1000);
    if(!localStorage.getItem('timeSet')) {
        var jo = new Date(); var po = jo.getTime(); var p1ko = po/1000; var p1knoDecimalo = Math.trunc(p1ko);
        localStorage.setItem('seconds-left', p1knoDecimalo); localStorage.setItem('timeSet', true);
    }  let width = 900;
    function frame(){
        var j = new Date(); var p = j.getTime(); var p1k = p/1000; var p1knoDecimal = Math.trunc(p1k);
        var theTime = localStorage.getItem('seconds-left');
        var timeDifference = parseFloat(p1knoDecimal) - parseFloat(theTime);
        width = 900 - timeDifference;

        if(width <= 840) {
            setTimeout(() => {
                if(localStorage.getItem('timeSet')) { localStorage.removeItem('timeSet'); }
            }, 300); var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
        } else {
            var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds }
        }
    }
}


function updateCartTotal2() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);
    
    document.getElementById('theno1').innerHTML =  'Cart Total: $' + total.toLocaleString();
}


if(window.location.href.includes('chime') || window.location.href.includes('wells')){
    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var addToCartImages = logsContainer.getElementsByClassName('borderp');

    for(var i = 0; i <addToCartImages.length; i++){
        var mgi = addToCartImages[i];
        mgi.classList.add('logo-50');
    }
}
