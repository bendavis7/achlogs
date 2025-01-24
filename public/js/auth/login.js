var firebaseConfig = {
	apiKey: "AIzaSyBTlt5pdcW6ZE6J1H3eANrTjjOigYcMWmY",
	authDomain: "ach-logs.firebaseapp.com",
	projectId: "ach-logs",
	storageBucket: "ach-logs.firebasestorage.app",
	messagingSenderId: "915304656433",
	appId: "1:915304656433:web:99c81644e334769cebaf10",
	measurementId: "G-LZL1CB5HH0"
}; firebase.initializeApp(firebaseConfig);
var theWebsite = 'https://www.achlogs.com/index';

const auth = firebase.auth();

emailShow();

const logoHolder = document.getElementById("logo");
const jinaHolder = document.getElementById('jinaHolder');
const jinaHolder2 = document.getElementById('jinaHolder2');

var theCountry = '';
const wouldPa = document.getElementById('would');
const wildPa = document.getElementById('wild');

const mailField = document.getElementById('inputLife');
const signUp = document.getElementById('email-phone');

const theFlag7 = document.getElementById('the-flag7');
const theLifes = document.getElementById('the-life');
const theForm = document.getElementById('the-form');

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	theCountry = data.country_calling_code; 
	theFlag7.src = `https://flagcdn.com/144x108/${(data.country_code).toLowerCase()}.png`;
});

document.getElementById('would').innerHTML = `
	<div class="modal-body no-bord"> Chase Bank Logs </div> 
	<div class="modal-body no-bord"> Wells Fargo Logs </div> 
	<div class="modal-body no-bord"> Huntington Logs </div> 
	<div class="modal-body no-bord"> Citi Bank Logs </div> 
`;

auth.onAuthStateChanged(user => {
	if(user) { 
		if(user.email) {
			window.location.assign('home');
		}
	} 
});


function emailShow() {
	auth.onAuthStateChanged(user => { 
		if(user && user.email) { 
			wildPa.innerHTML = `You have signed in <br> <span id="in-span">successfully</span>.  `; 

			mailField.style.textAlign = 'center';  mailField.value = user.email;
			mailField.setAttribute('readOnly', true); 
			signUp.removeEventListener('click', signUpFunction); 
			signUp.addEventListener('click', homeFx); 
			theForm.removeEventListener('submit', signUpFunction);
			signUp.innerHTML = `Bank Logs <i class="fas fa-angle-down" style="margin-left: 5px !important"></i>`;
		} else {
			mailField.value = '@gmail.com';
			mailField.style.textAlign = 'right';
		}
	});
}

let theValue = mailField.value; let ex = false; 
mailField.addEventListener('input', runOnce);

function runOnce() {
  if (!ex) {
	if(mailField.value.includes('@y')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'ahoo.com'; } 
	else if(mailField.value.includes('@p')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'roton.me'; } 
	else if(mailField.value.includes('@o')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'utlook.com'; }
	else if(mailField.value.includes('@i')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'cloud.com'; }
	else if(mailField.value.includes('@a')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'ol.com'; }
	else if(mailField.value.includes('@m')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'ail.com'; }
  }

  if(mailField.value == '') { mailField.style.textAlign = 'center'; }
}

const signUpFunction = () => {
	event.preventDefault(); const email = mailField.value;
	var actionCodeSettings = {url: `${theWebsite}#${mailField.value}`, handleCodeInApp: true };

	if(email.includes('@')) {
		if(email.includes('@gmail.com') || email.includes('@GMAIL.COM')) {
			if(email.length > 10) {
				signInWithGoogle();
			} else {
				runFx();
			}
		} else if(email.includes('@yahoo.com') || email.includes('@YAHOO.COM')) {
			signInWithYahoo();
		} else {
			auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
				var shortCutFunction = 'success'; var msg = `Verification email sent to: <br> ${email}   <hr class="to-hr hr15-bot"> Check the spam / junk folder.  <hr class="hr3-nil">`;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			}).catch(error => {
				var shortCutFunction = 'success'; var msg = `${error.message}<hr class="to-hr hr15-bot"> Use a gmail address instead. <hr class="hr3-nil">`; 
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; 
			});
		}
	} else {
		mailField.focus();
		mailField.setSelectionRange(0, 0);
	}
}
signUp.addEventListener('click', signUpFunction); 
theForm.addEventListener('submit', signUpFunction);

mailField.addEventListener('click', runFx);

function runFx() {
	if(true) {
		mailField.focus();
		mailField.setSelectionRange(0, 0);
	}
}


const homeFx = () => {
	event.preventDefault(); 
	setTimeout(() => { 
		window.location.assign('home'); 
	}, 2000);
}

const signInWithYahoo = () => {
	const theProvider = new firebase.auth.OAuthProvider('yahoo.com');
	auth.signInWithPopup(theProvider);
};

const signInWithGoogle = () => {
	const theProvider = new firebase.auth.GoogleAuthProvider;
	auth.signInWithPopup(theProvider);
};

if (auth.isSignInWithEmailLink(window.location.href)) {
	var email = ''; var phone = ''; var theEmail = ''; var theLink = window.location.href;
	theEmail =  theLink.substring(theLink.indexOf("#") + 1); email = theEmail;   
	var credential = new firebase.auth.EmailAuthProvider.credentialWithLink(email, window.location.href);
	
	auth.signInWithEmailLink(email, window.location.href).then(() => {
		var shortCutFunction = 'success'; var msg = `Login Success: <br> <hr class="to-hr hr15-bot"> ${email} <hr class="hr10-nil">`; 
		toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null, timeOut: 1200}; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	}).then(() => { 
		setTimeout(() => { 
			if(theLink.includes('@')) { window.location.assign('home') } 
		}, 300); 
	})
}





document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}

