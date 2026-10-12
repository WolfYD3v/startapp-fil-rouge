// IMPORTS
import { initForm } from "./form_script.js";
import { loadHTML } from "../load_html.js";
import "./setup_page.js";



// CONSTANTES
const TEMP_VALUES = {
    "name": "Temp Name",
    "username": "Temp Username",
    "link": "Temp Link"
};



// VARIABLES
// DOM Elements
let linksContainer = document.getElementById("links-container");
let editProfileLinkWidgetPopup = document.getElementById("edit-profile-link-widget-popup");
let createProfileLinkWidgetButton = document.getElementById("create-profile-link-widget-button");
let editProfileLinkWidgetPopupButtonsContainer = document.getElementById("edit-profile-link-widget-popup-buttons-container");
let deleteProfileLinkWidgetBtn = document.getElementById("delete-profile-link-widget-btn");
let updateProfileLinkWidgetBtn = document.getElementById("update-profile-link-widget-btn");

let profileLinkWidgetName = document.getElementById("profile-link-widget-name");
let profileLinkWidgetUsername = document.getElementById("profile-link-widget-username");
let profileLinkWidgetLink = document.getElementById("profile-link-widget-link");

// Other variables
let editProfileLinkWidgetPopupToggled = false;
let creatingNewProfileLinkWidgetPopup = false;
let currentProfileLinkWidgetEdited = null;

// Event Listeners
linksContainer.addEventListener("wheel", (event) => {
    if (event.deltaY !== 0) { event.preventDefault(); }
    linksContainer.scrollBy({
        left: event.deltaY,
        behavior: 'auto'
    });
}, { passive: false });
createProfileLinkWidgetButton.addEventListener("click", () => {
    profileLinkWidgetName.value = profileLinkWidgetUsername.value = profileLinkWidgetLink.value = ""
    creatingNewProfileLinkWidgetPopup = true;
    toggleEditProfileLinkWidgetPopup();
});
getEditProfileLinkWidgetPopupButtons().forEach(button => {
    button.addEventListener("click", (event) => {
        creatingNewProfileLinkWidgetPopup = false;
        let action = event.target.id.split("-")[0] // Get the first word off the id of the button clicked
        if (action == "update") {
            createProfileLinkWidgets(1);
            toggleEditProfileLinkWidgetPopup();
        }
        if (action == "cancel") { toggleEditProfileLinkWidgetPopup(); }
        if (action == "delete") {
            linksContainer.removeChild(currentProfileLinkWidgetEdited);
            toggleEditProfileLinkWidgetPopup();
        }
    });
});
[profileLinkWidgetName, profileLinkWidgetUsername, profileLinkWidgetLink].forEach(node => {
    node.addEventListener("input", validateNewProfileLinkWidgetCreation);
});



// Definition of functions
async function createProfileLinkWidgets(iterations = 5) {
    for (let idx = 0; idx < iterations; idx++) {
        await loadHTML("compenents/profile_link_widget_bis.html", "links-container");

        let profileLinkWidget = linksContainer.lastElementChild;
        if (profileLinkWidget) {
            profileLinkWidget.addEventListener("click", () => {
                creatingNewProfileLinkWidgetPopup = false;
                currentProfileLinkWidgetEdited = profileLinkWidget;
                profileLinkWidgetName.value = TEMP_VALUES["name"];
                profileLinkWidgetUsername.value = TEMP_VALUES["username"];
                profileLinkWidgetLink.value = TEMP_VALUES["link"];
                toggleEditProfileLinkWidgetPopup();
            });
        }
    }
}

function getEditProfileLinkWidgetPopupButtons() {
    let buttons = [];
    let rawData = editProfileLinkWidgetPopupButtonsContainer.childNodes;

    rawData.forEach(raw => {
        if (raw.tagName != undefined) { buttons.push(raw); }
    });

    return buttons
}

function toggleEditProfileLinkWidgetPopup() {
    editProfileLinkWidgetPopupToggled = !editProfileLinkWidgetPopupToggled;
    validateNewProfileLinkWidgetCreation();

    creatingNewProfileLinkWidgetPopup ? deleteProfileLinkWidgetBtn.style.display = "none" : deleteProfileLinkWidgetBtn.style.display = "flex";
    creatingNewProfileLinkWidgetPopup ? updateProfileLinkWidgetBtn.innerText = "create" : updateProfileLinkWidgetBtn.innerText = "update";
    editProfileLinkWidgetPopupToggled ? editProfileLinkWidgetPopup.style.display = "flex" : editProfileLinkWidgetPopup.style.display = "none";
    editProfileLinkWidgetPopupToggled ? linksContainer.style.display = "none" : linksContainer.style.display = "flex";
    editProfileLinkWidgetPopupToggled ? createProfileLinkWidgetButton.style.display = "none" : createProfileLinkWidgetButton.style.display = "flex";

    if (!editProfileLinkWidgetPopupToggled) { currentProfileLinkWidgetEdited = null; }
}

function validateNewProfileLinkWidgetCreation() {
    let valid = false;
    valid = profileLinkWidgetName.value != ""
    valid = profileLinkWidgetUsername.value != ""
    valid = profileLinkWidgetLink.value != ""

    updateProfileLinkWidgetBtn.disabled = !valid;
}

// Start the script by calling functons
initForm("edit-profile-form");
editProfileLinkWidgetPopup.style.display = "none";
await createProfileLinkWidgets();
