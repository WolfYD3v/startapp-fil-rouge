// IMPORTS
/* {code here} */



// CONSTANTES
const FORM_FIELD_INVALID_CLASS = "form-field-invalid";
const PASSWORD_ERROR = "Password typed incorrect";



// VARIABLES
// DOM Elements
let form = document.getElementById("sign-in-form");
let formFields = document.querySelectorAll("input[required], textarea[required]");
console.log(formFields);
let passwordText = document.getElementById("password-text");
let confirmPasswordText = document.getElementById("confirm-password-text");

// Other variables
/* {code here} */

// Event Listeners
// Listener for the submit event of the form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formValid = true;
    let errors = [];

    formFields.forEach(formField => {
        resetFormField(formField);
        if (!validateFormField(formField) || !validatePassword()) {
            formValid = false;
            errors.push(formField);
        }
    });

    if (formValid) {
        event.target.submit();
    }
    else {
        let firstErrorElement = document.querySelector(`label[for = ${errors[0].previousElementSibling.getAttribute("for")}]`);
        firstErrorElement.scrollIntoView({behavior: 'smooth'});
    }
});
// Listeners for the form fields
formFields.forEach(formField => {
    formField.addEventListener("input", event => {
        formFieldChanged(event.target);
    });
});



// Definition of functions
function formFieldChanged(formField) {
    resetFormField(formField);
    validateFormField(formField);
}

function validateFormField(formField) {
    let isValid = formField.checkValidity();
    if (!isValid) {
        formField.classList.add(FORM_FIELD_INVALID_CLASS);
        formField.previousElementSibling.insertAdjacentHTML(
            "beforeend",
            `<p style="color: red; margin: 0px; margin-top: 5px;" title="An error has been made while filling the form: ${formField.validationMessage}">${formField.validationMessage}</p>`
        )
    }

    return isValid
}

function validatePassword() {
    let output = passwordText.value === confirmPasswordText.value;
    if (!output) {
        confirmPasswordText.classList.add(FORM_FIELD_INVALID_CLASS);
        confirmPasswordText.previousElementSibling.insertAdjacentHTML(
            "beforeend",
            `<p style="color: red; margin: 0px; margin-top: 5px;" title="An error has been made while filling the form: ${PASSWORD_ERROR}">${PASSWORD_ERROR}</p>`
        );
    }
    return output
}

function resetFormField(formField) {
    let formFieldLabel = formField.previousElementSibling;
    formField.classList.remove(FORM_FIELD_INVALID_CLASS);
    while (formFieldLabel.firstElementChild) { formFieldLabel.removeChild(formFieldLabel.firstElementChild); }
}

// Start the script by calling functons
/* {code here} */