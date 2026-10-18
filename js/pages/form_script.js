// CONSTANTES
const FORM_FIELD_INVALID_CLASS = "form-field-invalid";



// VARIABLES
// DOM Elements
let form;
let formFields;

// Other variables
let hasBeenInit = false;



// Definition of functions
export function initForm(formNodeId, submitRedirectionURL) {
    form = document.getElementById(formNodeId);
    formFields = document.querySelectorAll("input[required], textarea[required]");
    initListeners(submitRedirectionURL);

    hasBeenInit = true;
}

function initListeners(submitRedirectionURL) {
    // Listener for the submit event of the form
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let formValid = true;
        let errors = [];

        formFields.forEach(formField => {
            resetFormField(formField);
            if (!validateFormField(formField)) {
                formValid = false;
                errors.push(formField);
            }
        });

        if (formValid) { window.location.href = submitRedirectionURL; }
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
}

function formFieldChanged(formField) {
    if (!hasBeenInit) { return }
    resetFormField(formField);
    validateFormField(formField);
}

function validateFormField(formField) {
    if (!hasBeenInit) { return false }
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

function resetFormField(formField) {
    if (!hasBeenInit) { return }

    let formFieldLabel = formField.previousElementSibling;
    formField.classList.remove(FORM_FIELD_INVALID_CLASS);
    while (formFieldLabel.firstElementChild) { formFieldLabel.removeChild(formFieldLabel.firstElementChild); }
}
