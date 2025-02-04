var firebaseConfig = {
	apiKey: "AIzaSyDVAudb7HnA_NvQrAS__i--H7RFnn2H28A",
	authDomain: "ach-log.firebaseapp.com",
	projectId: "ach-log",
	storageBucket: "ach-log.firebasestorage.app",
	messagingSenderId: "233075030957",
	appId: "1:233075030957:web:8da7bf0c5031bed0ceff24",
	measurementId: "G-LQGGYJNZ7R"
}; firebase.initializeApp(firebaseConfig);

if(!window.location.href.includes('chlogs')){ 
	if(!window.location.href.includes('5501')) {
		window.location.assign('index')
	}
}

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	localStorage.setItem('locationZ', data.country_name +  ', ' + data.city); 
	localStorage.setItem('citiZ', (data.city).substring(0, 8) + ', ' + data.country_code);
});

const auth = firebase.auth();
const db = firebase.firestore();

var thePerson = '';
var nesh = localStorage.getItem('ach-logs');
var vpnButn = document.getElementById('vpn');

const logoHolder = document.getElementById("logo");
const jinaHolder = document.getElementById("jinaHolder");
const jinaHolder2 = document.getElementById('jinaHolder2');

var navo = document.getElementsByClassName('navbar-header')[0];

if(localStorage.getItem('locationZ')) {
	var locationZ = localStorage.getItem('locationZ');
	var citiZ = localStorage.getItem('citiZ');
} else { 
	var locationZ = ', '; var citiZ = ', '; 
}

let itemz = [];
if(nesh){ 
	if((JSON.parse(nesh).length) > 0) {
    	itemz = (JSON.parse(nesh)[0]);
	}
}

if(platform.manufacturer !== null) { 
	var Device = ` ${platform.manufacturer} ${platform.product} `;
} else { 
	var Device =` ${platform.os} `;
	if(Device.includes('Windows 10')) { Device = `Windows 10` }
}

auth.onAuthStateChanged(user => {
	if(!user) { 
		if((JSON.parse(nesh).length) > 0) {
			auth.signInAnonymously();
		}
	} else {
		if (user.photoURL) {
			logoHolder.setAttribute("src", user.photoURL); 
			logoHolder.classList.add('logo-50');
		}

		var theGuy = locationZ + ', ' + user.uid;
	
		if(user.email) {
			var theaddress = (user.email).substring(0, (user.email).indexOf('@'));
			if (user.displayName) { theaddress = user.displayName; } 
			thePerson = `<hr class="hr-2"> ${theaddress}.`;
			theaddress = theaddress.substring(0, 10);
			jinaHolder.value = theaddress;
			theGuy = user.email;
			thePerson = `<hr class="hr-2"> 
				${theaddress} <hr id="hr-mail"> `;
		} else {
			thePerson = `<hr class="hr-2"> 
				${Device} <hr id="hr-name"> ${citiZ} `;
		}

		if((JSON.parse(nesh).length) > 0) {
			items = JSON.parse(nesh);
			for (var i = 0; i < (JSON.parse(nesh)).length; i++) {
				document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = `${thePerson}`; 
			}
		}

		var docRef = db.collection("users").doc(theGuy);
		docRef.get().then((doc) => {
			if (!(doc.exists)) { 
				return docRef.set({ 
					yourID: itemz, device: Device, location: locationZ 
				});
			} else { 
				return docRef.update({ 
					yourID: itemz, device: Device, location: locationZ 
				});
			}
		});
	}

	const signUpFunction = () => {
		auth.onAuthStateChanged(user => { 
			var toasti = 0; var toastzi = 0; 
			if(localStorage.getItem('btcTotal')) { 
				var toastbtci = localStorage.getItem('btcTotal');
			} else { var toastbtci = 'Your ' }

			if(nesh) { 
				if((JSON.parse(nesh).length) > 0) {
					if(JSON.parse(nesh).length == 1) {
						toasti = localStorage.getItem('banktotal'); 
						toastzi = toasti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					} else if(JSON.parse(nesh).length == 2) { 
						toasti = localStorage.getItem('divtotal'); 
						toastzi = toasti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}
				}
			}

			if(user.email) {
				var docRef = db.collection("sent").doc(user.email); 
				docRef.get().then((doc) => { if (!(doc.exists)) { 
					auth.currentUser.sendEmailVerification(); 
					var shortCutFunction = 'success'; var msg = ` 
						Logins will be sent to <br> ${user.email}                     <hr class="to-hr hr15-top"> 
						Verify your email inbox,  <br> Check the spam - folder.       <hr class="hr15-top"> `;
					toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, timeOut: 5000, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;					
				} else { 
					setTimeout(() => { generatePDF(); }, 6000);
					var shortCutFunction = 'success';  var msg = ` 
						${toastbtci} BTC not detected <br> Send exactly $${toastzi}.  <hr class="to-hr hr15-top"> 
						Bank logs will be sent to <br> ${user.email}.                 <hr class="hr15-top"> `;
					toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, timeOut: 5000, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
				}});
			} else {
				setTimeout(() => { window.location.assign('home'); }, 7000);
				var shortCutFunction = 'success';  var msg = ` 
					${toastbtci} BTC not detected <br> Send exactly $${toastzi}.   <hr class="to-hr hr15-top"> 
					You're not logged in <br> with an email address ..             <hr class="hr15-top"> `;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, timeOut: 5000, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
			}

			setTimeout(() => { $('#exampleModal').modal('hide'); }, 4000);

			var docRef = db.collection("users").doc(theGuy);
			docRef.get().then((doc) => { 
				return docRef.update({ download: true }) 
			});
		});
	}
	document.getElementById('monez').addEventListener('click', signUpFunction);

	vpnButn.addEventListener('click', generatePDF);

	function generatePDF() {
		var shortCutFunction = 'success'; var msg = `Generating PDF...  <br> Payment Status: Pending  <hr class="to-hr hr15-bot">`; 
		toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; 
		
		var docRef = db.collection("users").doc(theGuy);
		docRef.get().then((doc) => { 
			return docRef.update({ pdfFile: 'PDF File' }) 
		});

		setTimeout(() => { 
			var pdfObject = jsPDFInvoiceTemplate.default(props); 
			console.log("Object created", pdfObject); 
		}, 4000);
	}

	if(JSON.parse(nesh).length == 1) {
		const bankLog = (JSON.parse(nesh)[0].account);
		const bankBal = (JSON.parse(nesh)[0].balance);
		var bankImg = (JSON.parse(nesh)[0].image);
		const banking1 = (JSON.parse(nesh)[0].info1);
		const banking2 = (JSON.parse(nesh)[0].info2);
		const banking3 = (JSON.parse(nesh)[0].info3);
		const banking4 = (JSON.parse(nesh)[0].info4);
		const banking5 = (JSON.parse(nesh)[0].info5);

		let items3 = (JSON.parse(nesh)); var total = 0;
		items3.map(data=>{ var price4 = data.price.replace('Price: ','').replace(',','').replace('$',''); total = total + (price4 * 1); });

		var today = new Date(); var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;

		var theName = Device + ', ' + citiZ;
		var theAddress = locationZ + ', ' + Device;

		if(user.email) { theName = user.email;
			if (user.photoURL) { bankImg =  user.photoURL; }
		}

		if(bankLog.includes('Woodforest')) { bankImg = `img/partners/wood.jpg`; }

		var props = {
			outputType: jsPDFInvoiceTemplate.OutputType.Save, returnJsPDFDocObject: true,
			fileName: bankLog + ' ' + bankBal,
			orientationLandscape: false, compress: true,
			logo: { src: bankImg, type: 'PNG',  width: 30, height: 30, margin: { top: 0, left: 0 } },
			stamp: {
				inAllPages: true, 
				src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
				type: 'JPG', width: 20,height: 20,margin: { top: 0, left: 0 }
			},
			business: {
				name: "ACH Logs", 
				email: "email@achlogs.com", 
				email_1: "Date: " + today, 
				website: "Bank Logins",
			},
			contact: {
				label: "Invoice issued for: ", 
				name: theName,
				address: theAddress, 
				email: "ACH Logs",
			},
			invoice: {
				label: bankLog, num: 1,
				invDate: "Payment Status: Pending",
				invGenDate: "Invoice Date: " + today,
				headerBorder: false, tableBodyBorder: false,
				header: [
				{  title: "Account", style: { width: 30 } }, 
				{  title: "Balance", style: { width: 25 } }, 
				{  title: "Info1", style: { width: 25 } }, 
				{  title: "Info2", style: { width: 25 } }, 
				{  title: "Info3", style: { width: 25 } }, 
				{  title: "Info4", style: { width: 25 } }, 
				{  title: "Info5", style: { width: 25 } }, 
				{ title: "Total"}
				],
				table: Array.from(Array(1), (item, index)=>([
					bankLog, bankBal,banking1, banking2,banking3,banking4,banking5,'$' + total,
				])),
				invDescLabel: "Payment Status: PENDING",
				invDesc: "Bitcoin address: ' 1AMjPsZQvqeAfnEjfk17fEUZc6rZuM9Ccp ' ",
			},
			footer: { text: "Copyright © Ach Logs -:- 2025", }, pageEnable: true, pageLabel: "Page ",
		};
	}
});


document.getElementById("thebodyz").oncontextmenu = function() {return false};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) { event.preventDefault(); }   
	});
}

var canvas = document.getElementById("canvas"); var ctx = canvas.getContext("2d"); var radius = canvas.height / 2;
ctx.translate(radius, radius); radius = radius * 1;  setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius); 	drawNumbers(ctx, radius);	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;	ctx.beginPath();	ctx.arc(0, 0, radius, 0, 2 * Math.PI);	ctx.fillStyle = 'white';	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);	
	grad.addColorStop(0, '#121d33');	grad.addColorStop(0.5, 'rgba(0,0,0,0)');	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;	ctx.lineWidth = radius * 0;	ctx.stroke();	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);	ctx.fillStyle = '#121d33';	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;	var num;	ctx.font = radius * 0.33 + "px arial";	ctx.textBaseline = "middle";	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;	ctx.rotate(ang);	ctx.translate(0, -radius * 0.87);	ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);	ctx.rotate(ang);	ctx.translate(0, radius * 0.87);	ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	hour = hour % 12;
	hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) +	(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}


var canvas2 = document.getElementById("canvas2"); var ctx2 = canvas2.getContext("2d");
var radius2 = canvas2.height / 2; ctx2.translate(radius2, radius2);
radius2 = radius2 * 1; setInterval(drawClock2, 1000);

function drawClock2() {
	drawFace2(ctx2, radius2);
	drawNumbers2(ctx2, radius2);
	drawTime2(ctx2, radius2);
}

function drawFace2(ctx2, radius2) {
	var grad2; ctx2.beginPath(); ctx2.arc(0, 0, radius2, 0, 2 * Math.PI);
	ctx2.fillStyle = 'white'; ctx2.fill(); grad2 = ctx2.createRadialGradient(0, 0, radius2 * 0.05, 0, 0, radius2 * 2.5);
	grad2.addColorStop(0, '#121d33'); grad2.addColorStop(0.5, 'rgba(0,0,0,0)'); grad2.addColorStop(1, '#121d33');
	ctx2.strokeStyle = grad2; ctx2.lineWidth = radius2 * 0; ctx2.stroke(); ctx2.beginPath();
	ctx2.arc(0, 0, radius2 * 0.1, 0, 2 * Math.PI); ctx2.fillStyle = '#121d33'; ctx2.fill();
}

function drawNumbers2(ctx2, radius2) {
	var ang2; var num2;
	ctx2.font = radius2 * 0.33 + "px arial"; ctx2.textBaseline = "middle"; ctx2.textAlign = "center";
	for (num2 = 1; num2 < 13; num2++) {
		ang2 = num2 * Math.PI / 6; ctx2.rotate(ang2); ctx2.translate(0, -radius2 * 0.87); ctx2.rotate(-ang2);
		ctx2.fillText(num2.toString(), 0, 0); ctx2.rotate(ang2); ctx2.translate(0, radius2 * 0.87); ctx2.rotate(-ang2);
	}
}

function drawTime2(ctx2, radius2) {
	var now2 = new Date(); var hour2 = now2.getHours();
	var minute2 = now2.getMinutes(); var second2 = now2.getSeconds();
	hour2 = hour2 % 12;
	hour2 = (hour2 * Math.PI / 6) + (minute2 * Math.PI / (6 * 60)) + (second2 * Math.PI / (360 * 60));
	drawHand2(ctx2, hour2, radius2 * 0.5, radius2 * 0.07);
	minute2 = (minute2 * Math.PI / 30) + (second2 * Math.PI / (30 * 60));
	drawHand2(ctx2, minute2, radius2 * 0.8, radius2 * 0.07);
	second2 = (second2 * Math.PI / 30);
	drawHand2(ctx2, second2, radius2 * 0.9, radius2 * 0.02);
}

function drawHand2(ctx2, pos, length, width) {
	ctx2.beginPath(); ctx2.lineWidth = width; ctx2.lineCap = "round"; ctx2.moveTo(0, 0);
	ctx2.rotate(pos); ctx2.lineTo(0, -length); ctx2.stroke(); ctx2.rotate(-pos);
}
