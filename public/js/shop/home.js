let items = [];

var table1 = jQuery('#example1').DataTable();
var showingToast = document.getElementById('showtoasts');

var theLogo = document.getElementById('logo');

var logs = localStorage.getItem('ach-logs');

const auth2 = firebase.auth();

if(localStorage.getItem('ach-logs')){
    if((JSON.parse(localStorage.getItem('ach-logs')).length) > 0) {

        items = JSON.parse(localStorage.getItem('ach-logs'));
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('ach-logs')).length);

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

function showThis() {
    if(logs && (JSON.parse(localStorage.getItem('ach-logs')).length) > 0) {
        auth2.onAuthStateChanged(user => {
            if(user.email) { 
                window.location.assign('download'); 
            } else {
                var shortCutFunction = 'success'; var msg = `You're not logged in <br> with an email addresss.. <hr class="to-hr hr15-bot">`; 
                toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; $('#profileModal').modal('hide'); 
            }
        });
    } else { 
        var shortCutFunction = 'success'; var msg = `Your cart is empty... <br> add bank logs to cart. <hr class="to-hr hr15-bot">`; 
        toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; $('#profileModal').modal('hide'); 
    }
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

    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4,info5);
    buttonClicked.parentElement.parentElement.remove();
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
    localStorage.setItem('ach-logs', JSON.stringify(items.filter(checkAdult)));
    items = items.filter(checkAdult);
    window.location.reload()
}


function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('ach-logs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });

    document.getElementById('thetot').innerHTML = `Total:  <span>$${total.toLocaleString()}</span>`;
    document.getElementById('theno1').innerHTML =  'Cart Total: $' + total.toLocaleString();
    
    if(JSON.parse(localStorage.getItem('ach-logs')).length > 0) {
        const bankLog = (JSON.parse(localStorage.getItem('ach-logs'))[0].account);
        const bankImg = (JSON.parse(localStorage.getItem('ach-logs'))[0].image);

		const bankBal = (JSON.parse(localStorage.getItem('ach-logs'))[0].balance);
		const banking1 = (JSON.parse(localStorage.getItem('ach-logs'))[0].info1);
		const banking2 = (JSON.parse(localStorage.getItem('ach-logs'))[0].info2);
		const banking3 = (JSON.parse(localStorage.getItem('ach-logs'))[0].info3);
		const banking4 = (JSON.parse(localStorage.getItem('ach-logs'))[0].info4);
		const banking5 = (JSON.parse(localStorage.getItem('ach-logs'))[0].info5);

        theLogo.src = `${bankImg}`;
        document.getElementById('jinaHolder2').innerHTML = `${bankLog}`;

        if(bankLog.includes('Chime') || bankLog.includes('Wells') || bankLog.includes('P.N.C') || bankLog.includes('Woodforest')) {
            theLogo.classList.add('bit-img'); theLogo.classList.add('logo-50');
        }
        if(bankLog.includes('Woodforest')) {
            theLogo.src = `img/partners/wood.jpg`;
        }

        document.getElementById('would').innerHTML = `
            <div class="modal-body no-bord"> <span id="in-span">${bankBal}</span> </div> 
            <div class="modal-body no-bord"> ${banking1} </div> 
            <div class="modal-body no-bord"> ${banking2} </div> 
            <div class="modal-body no-bord"> ${banking3} </div> 
            <div class="modal-body no-bord"> ${banking4} </div> 
            <div class="modal-body no-bord"> ${banking5} </div> 
        `;
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
