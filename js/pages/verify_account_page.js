// IMPORTS
// import { loadHTML } from "../load_html.js";



// CONSTANTES
const CODE_LENGHT = 6;
const ALLOWED_CODE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz1234567890";



// VARIABLES
// DOM Elements
let verifyAccountAsksContainer = document.getElementById("verify-account-asks-container");
let reSendCodeBtn = document.getElementById("re-send-code-btn");
let verifyAccountForm = document.getElementById("verify-account-form");

// Other variables
let currentCode = "";
let allVerifyAccountAsks = getAllVerifyAccountAsks();

// Event Listeners
reSendCodeBtn.addEventListener("click", () => {
    clearInputedCode();
    generateCode();
    sendCode();
});
verifyAccountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (verityCodeInputed()) {
        event.target.submit();
    }
});
allVerifyAccountAsks.forEach(verifyAccountAsk => {
    verifyAccountAsk.addEventListener("input", () => {
        if (verifyAccountAsk.value != "") {
            let next = allVerifyAccountAsks[allVerifyAccountAsks.indexOf(verifyAccountAsk) + 1];
            if (next != undefined) { next.focus(); }
        }
    });
});


// Definition of functions
function getAllVerifyAccountAsks() {
    let rawData = verifyAccountAsksContainer.childNodes;
    let newData = [];
    rawData.forEach(raw => {
        if (raw.tagName !== undefined) { newData.push(raw); }
    })

    console.log(newData);
    return newData
}

// (Re)Generate a random code (with numbers, and lower/upper characters)
function generateCode() {
    currentCode = "";
    for (let loop = 0; loop < CODE_LENGHT; loop++) {
        let newCurrentCodeChar = ALLOWED_CODE_CHARACTERS[Math.floor(Math.random() * ALLOWED_CODE_CHARACTERS.length)];
        if (Math.random() >= 0.5) { newCurrentCodeChar = newCurrentCodeChar.toUpperCase(); }
        currentCode += newCurrentCodeChar;
    }
}

function clearInputedCode() {
    allVerifyAccountAsks.forEach(verifyAccountAsk => {
        verifyAccountAsk.value = "";
        verifyAccountAsk.classList.toggle("error", false);
    });
}

function sendCode() {
    console.log(`Sending Code: '${currentCode}' ...`);
    alert(`Code Genrated/Sended: ${currentCode}\nTemporary Method (No Mail/Message System Added)\nOpen the console to see the code if you forgot it.`);
}

function verityCodeInputed() {
    let inputedCodeLenght = 0;
    let errorsBuffer = [];

    allVerifyAccountAsks.forEach((verifyAccountAsk, idx) => {
        verifyAccountAsk.classList.toggle("error", false);

        if (verifyAccountAsk.value != "") { inputedCodeLenght++; }
        if (verifyAccountAsk.value != currentCode[idx]) { errorsBuffer.push(verifyAccountAsk); }
    });

    // Check if less than 6 characters are typed -> ERROR
    if (inputedCodeLenght != CODE_LENGHT) { console.log("ERROR: The inputed code is not long ennought !") }
    else {
        if (errorsBuffer.length > 0) {
            errorsBuffer.forEach(errorElement => {
                errorElement.classList.toggle("error", true);
            });
        }
        else { return true }
    }
    return false
}

// Start the script by calling functons
generateCode();
sendCode();