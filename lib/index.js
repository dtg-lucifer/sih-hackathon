import "../styles/globals.scss"
import "../styles/styles.scss"

const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-Link');
const registerLink = document.querySelector('.Register-Link');

registerLink.addEventListener('click', () => { 
	logregBox.classList.add("active"); 
});

loginLink.addEventListener('click', () => {
	logregBox.classList.remove("active");

});