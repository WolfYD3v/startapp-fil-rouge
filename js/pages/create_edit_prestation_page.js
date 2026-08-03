// IMPORTS
import { initForm } from "./form_script.js";
import { getURLArgument } from "../get_url_arument.js"



// CONSTANTES
/* {code here} */



// VARIABLES
// DOM Elements
let formSection1 = document.getElementById("form-section-1");
let formSection1ToggleButton = document.getElementById("form-section-1-toggle-button");
let formSection2 = document.getElementById("form-section-2");
let formSection2ToggleButton = document.getElementById("form-section-2-toggle-button");
let formSection3 = document.getElementById("form-section-3");
let formSection3ToggleButton = document.getElementById("form-section-3-toggle-button");
let submitButton = document.getElementById("submit-button");

// Other variables
let formSection1Toggled = true;
let formSection2Toggled = false;
let formSection3Toggled = false;

// Event Listeners
formSection1ToggleButton.addEventListener("click", () => {
    formSection1Toggled = !formSection1Toggled;
    toggleFormSection(formSection1ToggleButton, formSection1, formSection1Toggled);
});
formSection2ToggleButton.addEventListener("click", () => {
    formSection2Toggled = !formSection2Toggled;
    toggleFormSection(formSection2ToggleButton, formSection2, formSection2Toggled);
});
formSection3ToggleButton.addEventListener("click", () => {
    formSection3Toggled = !formSection3Toggled;
    toggleFormSection(formSection3ToggleButton, formSection3, formSection3Toggled);
});
submitButton.addEventListener("click", () => {
    formSection1Toggled = formSection2Toggled = formSection3Toggled = true;
    toggleFormSection(formSection1ToggleButton, formSection1, formSection1Toggled);
    toggleFormSection(formSection2ToggleButton, formSection2, formSection2Toggled);
    toggleFormSection(formSection3ToggleButton, formSection3, formSection3Toggled)
});



// Definition of functions
function toggleFormSection(formSectionToggleButton, formSection, toggled) {
    let displayProperty = ""
    toggled ? displayProperty = "flex" : displayProperty = "none";
    formSection.style.setProperty("display", displayProperty, "important");

    toggled ? formSectionToggleButton.innerText = ">" : formSectionToggleButton.innerText = "v";
    toggled ? formSectionToggleButton.title = "Hide this form section" : formSectionToggleButton.title = "Develop this form section";
}

// Start the script by calling functons
initForm("form");

setTimeout( () => {
    toggleFormSection(formSection1ToggleButton, formSection1, formSection1Toggled);
    toggleFormSection(formSection2ToggleButton, formSection2, formSection2Toggled);
    toggleFormSection(formSection3ToggleButton, formSection3, formSection3Toggled);
}, 500)

if (getURLArgument("edit") == 1) {
    submitButton.innerText = "Update";
    submitButton.title = "Update the informations of the modified prestation";
}