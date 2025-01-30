let items = [];
const auth2 = firebase.auth();

var theLogo = document.getElementById('logo');
var monezB = document.getElementById('monez');
var thetotS = document.getElementById('thetot');

var logs = localStorage.getItem('ach-logs');

if(localStorage.getItem('ach-logs')){
    if((JSON.parse(localStorage.getItem('ach-logs')).length) > 0) {
        items = JSON.parse(localStorage.getItem('ach-logs'));
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('ach-logs')).length);
    
        for(var i = 0; i < items.length; i++) {
            if((items[i].account).includes('CHECKING') || (items[i].account).includes('SPENDING') || (items[i].account).includes('CHEQUING')){
                var cartRow3 = document.createElement('div');
                cartRow3.classList.add('col-lg-3', 'col-xl-2', 'col-md-4', 'col-6');
                var balance2 = items[i].balance;
                var price2 = items[i].price;
                var balance3 = balance2.replace('Balance: ', '');
                var price3 = price2.replace('Price: ', 'Save: ');
                var cartItems3 = document.getElementsByClassName('xenon4')[0];
                var cartRowContents3 = `
                    <div class="pricing-list highlight" id="the-logs">
                        <div class="pricing-list-price">
                            <h2 class="text-white">${balance3}</h2>
                            <img src=${items[i].image} class="borderp">
                        </div>
                        <ul>
                            <li class="text-white">${items[i].website} </li>
                            <li class="text-white">${items[i].info1} </li>
                            <li class="text-white">${items[i].info2} </li>
                            <li class="text-white">${items[i].info3} </li>
                            <li class="text-white">${items[i].info4} </li>
                            <li class="text-white">${items[i].info5} </li>
                            <li class="text-white">${(items[i].account).replace('[','<br>[').replace(']',' ACCOUNT]')}</li>
                            <button type="submit" class="butn white" id="modem" data-bs-toggle="modal" data-bs-target="#exampleModal">
                               Download <i class="fas fa-angle-down"></i>
                            </button>
                        </ul>
                    </div>
                `;
                cartRow3.innerHTML = cartRowContents3;
                cartItems3.prepend(cartRow3);
            } else {
                var cartRow3 = document.createElement('div');
                cartRow3.classList.add('col-lg-3', 'col-xl-2', 'col-md-4', 'col-6');
                var balance2 = items[i].balance;
                var price2 = items[i].price;
                var balance3 = balance2.replace('Balance: ', '');
                var price3 = price2.replace('Price: ', 'Save: ');
                var cartItems3 = document.getElementsByClassName('xenon4')[0];
                var cartRowContents3 = `
                    <div class="pricing-list" id="the-logs">
                        <div class="pricing-list-price">
                            <h2>${balance3}</h2>
                            <img src=${items[i].image} class="borderp">
                        </div>
                        <ul>
                            <li>${items[i].website} </li>
                            <li>${items[i].info1} </li>
                            <li>${items[i].info2} </li>
                            <li>${items[i].info3} </li>
                            <li>${items[i].info4} </li>
                            <li>${items[i].info5} </li>
                            <li>${(items[i].account).replace('[','<br>[').replace(']',' ACCOUNT]')}</li>
                            <button type="submit" class="butn" id="modem" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Download <i class="fas fa-angle-down"></i>
                            </button>
                        </ul>
                    </div>
                `;
                cartRow3.innerHTML = cartRowContents3;
                cartItems3.prepend(cartRow3);
            }    
        }

        for(var i = 0; i < items.length; i++) {
            var cartRow = document.createElement('tr');
            var cartRow2 = document.createElement('li');
            cartRow.classList.add('table-warning');
            cartRow2.classList.add('total','bg-black');
            var cartItems =  document.getElementsByClassName('champez3')[0];
    
            var cartRowContents = `
                <td><img src=${items[i].image}></td>       
                <td>
                    PENDING <hr id="hr-pend">
                    <span>${(items[i].balance).replace('Balance: ','')}</span> 
                </td>
                <td id=${'name-on-table' + items.indexOf(items[i])} style="filter: blur(0px); white-space: normal !important;"></td>  
                <td>${items[i].account}</td>
                <td><button class="btn-cloze btn-remove"></button></td>
                <td>${(items[i].price).replace('Price: ', '')}</td>
                <td>${items[i].info1}</td>
                <td>${items[i].info2}</td>
                <td>${items[i].info3}</td>
                <td>${items[i].info4}</td>
                <td>${items[i].info5}</td>
                <td>${items[i].website}</td>
            `;
            cartRow.innerHTML = cartRowContents;
            cartItems.prepend(cartRow);
        }
    
        updateCartTotal();
    
        var removeFromCartButtons = document.getElementsByClassName('btn-remove');
        for(var i = 0; i <removeFromCartButtons.length; i++){
            var button = removeFromCartButtons[i];
            button.addEventListener('click', removeCartItem)
        }

        thetotS.addEventListener('click', ()=> { 
            document.getElementById('modem').click(); });

        document.getElementById('vpn').addEventListener('click', ()=> { 
            document.getElementById('modem').click(); });
        
        document.getElementById('the-logs').addEventListener('click', ()=> { 
            document.getElementById('modem').click(); });
        
        document.getElementById('modem').addEventListener('click', () => { 
            setTimeout(() => { monezB.click(); }, 2000); });
    } else {
        document.getElementById('cartlength').style.display = 'none'; setTimeout(() => { window.location.assign('index'); }, 5000);
        var shortCutFunction = 'success'; var msg = `Your cart is empty... <br> add bank logs to cart. <hr class="to-hr hr15-bot">`; toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; $('#profileModal').modal('hide'); 
    }
} else {
    document.getElementById('cartlength').style.display = 'none'; setTimeout(() => { window.location.assign('index'); }, 5000);
    var shortCutFunction = 'success'; var msg = `Your cart is empty... <br> add bank logs to cart. <hr class="to-hr hr15-bot">`; toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; $('#profileModal').modal('hide'); 
}


document.getElementById('balance1').innerHTML = '$4,630';
document.getElementById('balance2').innerHTML = '$4,574';
document.getElementById('balance3').innerHTML = '$4,905';
document.getElementById('balance4').innerHTML = '$4,523';
document.getElementById('balance5').innerHTML = '$4,402';
document.getElementById('balance6').innerHTML = '$4,740';
document.getElementById('balance7').innerHTML = '$4,087';
document.getElementById('balance8').innerHTML = '$4,259';
document.getElementById('balance9').innerHTML = '$4,820';

document.getElementById('balance10').innerHTML = '$4,805';
document.getElementById('balance11').innerHTML = '$4,214';
document.getElementById('balance12').innerHTML = '$4,390';
document.getElementById('balance13').innerHTML = '$4,832';
document.getElementById('balance14').innerHTML = '$4,439';
document.getElementById('balance15').innerHTML = '$4,228';
document.getElementById('balance16').innerHTML = '$4,910';
document.getElementById('balance17').innerHTML = '$4,104';
document.getElementById('balance18').innerHTML = '$4,724';
document.getElementById('balance19').innerHTML = '$4,863';
document.getElementById('balance20').innerHTML = '$4,270';
document.getElementById('balance21').innerHTML = '$4,309';
document.getElementById('balance22').innerHTML = '$4,183';

var jobs = document.getElementsByClassName('prized');
for(j=0; j< jobs.length; j++) {
    var theJob = jobs[j];
    var thePrize = theJob.parentElement.children[1].children[2].innerText;
    
    var thePr = parseFloat((thePrize.replace("$", "").replace(",", "") / 42).toFixed(0)).toLocaleString();
    theJob.innerHTML = '$'+ thePr;
}


function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var price = 'Price: ' + cartItem.children[5].innerText;
    var balance = 'Balance: ' + cartItem.children[1].children[1].innerText;

    var account = cartItem.children[3].innerText;
    var image = cartItem.children[0].children[0].src;


    var info1 = cartItem.children[6].innerText;
    var info2 = cartItem.children[7].innerText;
    var info3 = cartItem.children[8].innerText;
    var info4 = cartItem.children[9].innerText;
    var info5 = cartItem.children[10].innerText;
    var website = cartItem.children[11].innerText;

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
    if(localStorage.getItem('timeSet')) { localStorage.removeItem('timeSet'); }
    window.location.reload()
}


function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('ach-logs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });

    var modalAmount = document.getElementById('modal-amount');

    document.getElementById('thetot').innerHTML = `Total:  <span>$${total.toLocaleString()}</span>`;


    var discountTotal = parseInt((total * 0.9).toFixed(0));
    localStorage.setItem('divtotal', discountTotal);
    var disTot = localStorage.getItem('divtotal');

    if(JSON.parse(localStorage.getItem('ach-logs')).length > 0) {
        const bankLog = (JSON.parse(localStorage.getItem('ach-logs'))[0].account);
        const bankBal = (JSON.parse(localStorage.getItem('ach-logs'))[0].balance);
        const bankImg = (JSON.parse(localStorage.getItem('ach-logs'))[0].image);

    
        document.getElementById('jinaHolder2').innerHTML = `${bankLog} - ${bankBal}`;

        theLogo.src = `${bankImg}`;

        if(bankLog.includes('Chime') || bankLog.includes('Wells') || bankLog.includes('P.N.C') || bankLog.includes('Woodforest')) {
            theLogo.classList.add('bit-img'); theLogo.classList.add('logo-50');
        }
        if(bankLog.includes('Woodforest')) {
            theLogo.src = `img/partners/wood.jpg`;
        }

        if (window.innerWidth > 1082) { 
            document.getElementsByClassName('vpn-section')[0].classList.add('grids');
        } 

        modalAmount.innerHTML = `
            Send  $<span id="omanyala" class="countup">${parseInt(total).toLocaleString()}</span>
        `;
    } 
    localStorage.setItem('banktotal',total);
}



var elemj = document.getElementById('pablos');        
var id = setInterval(frame, 1000);

if(!localStorage.getItem('timeSet')) {
    var jo = new Date();
    var po = jo.getTime();
    var p1ko = po/1000;
    var p1knoDecimalo = Math.trunc(p1ko);
    localStorage.setItem('seconds-left', p1knoDecimalo);
    localStorage.setItem('timeSet', true);
}
let width = 900;

function frame(){
    var j = new Date();
    var p = j.getTime();
    var p1k = p/1000;
    var p1knoDecimal = Math.trunc(p1k);
    var theTime = localStorage.getItem('seconds-left');
    var timeDifference = parseFloat(p1knoDecimal) - parseFloat(theTime);
    width = 900 - timeDifference;

    if(width <= 10) {
        window.location.assign('index');
    } else if(width < 300) {
        elemj.classList.add("bg-danger");
        var minutes = Math.floor(width/60); var seconds = width - minutes * 60;
        if(seconds < 10){ seconds = '0'+seconds } elemj.style.width = (width/9) + "%";
        document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}  <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> `;
    } else if(width < 600) {
        elemj.classList.add("bg-warning");
        var minutes = Math.floor(width/60); var seconds = width - minutes * 60;
        if(seconds < 10){ seconds = '0'+seconds } elemj.style.width = (width/9) + "%";
        document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}  <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> `;
    } else {
        var minutes = Math.floor(width/60); var seconds = width - minutes * 60;
        if(seconds < 10){ seconds = '0'+seconds } elemj.style.width = (width/9) + "%";
        document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}  <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> `;
    }
}

