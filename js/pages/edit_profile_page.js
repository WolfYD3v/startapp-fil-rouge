// IMPORTS
import { DB_MANAGER_INSTANCE } from "../db_manager.js";
import { initForm } from "./form_script.js";
import { loadHTML } from "../load_html.js";
import "./setup_page.js";



// CONSTANTES
const PROFILE_LINK_WIDGET_INITIAL_DATA = {
    "name": "Temp Name",
    "username": "Temp Username",
    "link": "https://github.com/"
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

let profileName = document.getElementById("profile-name");
let information = document.getElementById("information");
let description = document.getElementById("description");

// Other variables
let editProfileLinkWidgetPopupToggled = false;
let creatingNewProfileLinkWidgetPopup = false;
let currentProfileLinkWidgetEdited = null;
let profileData = {};

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
            createProfileLinkWidgets(PROFILE_LINK_WIDGET_INITIAL_DATA);
            toggleEditProfileLinkWidgetPopup();
        }
        if (action == "cancel") { toggleEditProfileLinkWidgetPopup(); }
        if (action == "delete") {
            let idxForbidden = [...linksContainer.children].indexOf(currentProfileLinkWidgetEdited);
            console.log(idxForbidden);
            let idx = 0;

            let newWidgetLinks = [];
            profileData.widgetLinks.forEach(() => {
                console.log(idxForbidden != idx);
                if (idx != idxForbidden) { newWidgetLinks.push(profileData.widgetLinks[idx]); }
                idx++;
            });
            profileData.widgetLinks = newWidgetLinks;
            console.log(profileData.widgetLinks);

            linksContainer.removeChild(currentProfileLinkWidgetEdited);
            toggleEditProfileLinkWidgetPopup();
        }
    });
});
[profileLinkWidgetName, profileLinkWidgetUsername, profileLinkWidgetLink].forEach(node => {
    node.addEventListener("input", validateNewProfileLinkWidgetCreation);
});



// Definition of functions
async function initPageInfos() {
    profileData = await DB_MANAGER_INSTANCE.getData("users.1");
    let infos = profileData.infos;
    profileName.value = infos.username;
    profileName.placeholder = infos.username;
    information.value = infos.displayedInformation;
    information.placeholder = infos.displayedInformation;
    description.value = infos.description;
    description.placeholder = infos.description;

    await createProfileLinkWidgets(profileData.widgetLinks);
}

async function createProfileLinkWidgets(linksData) {
    Object.values(linksData).forEach(async function(linkData) {
        await loadHTML("compenents/profile_link_widget_bis.html", "links-container");

        let profileLinkWidget = linksContainer.lastElementChild;
        if (profileLinkWidget) {
            console.log(linkData);
            updateLinkWidgetBtnInfos(profileLinkWidget, linkData);
            profileLinkWidget.addEventListener("click", () => {
                creatingNewProfileLinkWidgetPopup = false;
                currentProfileLinkWidgetEdited = profileLinkWidget;

                updateProfileLinkWidgetBtnValues(linkData);
                toggleEditProfileLinkWidgetPopup();
            })};
    });
}

function updateLinkWidgetBtnInfos(linkWidgetBtn, data) {
    linkWidgetBtn.querySelector("#link-name").innerText = data.name;
    linkWidgetBtn.querySelector("#link-username").innerText = data.username;
}

function getEditProfileLinkWidgetPopupButtons() {
    let buttons = [];
    let rawData = editProfileLinkWidgetPopupButtonsContainer.childNodes;

    rawData.forEach(raw => {
        if (raw.tagName != undefined) { buttons.push(raw); }
    });

    return buttons
}

function updateProfileLinkWidgetBtnValues(data) {
    profileLinkWidgetName.value = data.name;
    profileLinkWidgetUsername.value = data.username;
    profileLinkWidgetLink.value = data.link;
}

function toggleEditProfileLinkWidgetPopup() {
    editProfileLinkWidgetPopupToggled = !editProfileLinkWidgetPopupToggled;
    editProfileLinkWidgetPopupToggled ? console.log("er") : validateNewProfileLinkWidgetCreation() ;

    creatingNewProfileLinkWidgetPopup ? deleteProfileLinkWidgetBtn.style.display = "none" : deleteProfileLinkWidgetBtn.style.display = "flex";
    creatingNewProfileLinkWidgetPopup ? updateProfileLinkWidgetBtn.innerText = "create" : updateProfileLinkWidgetBtn.innerText = "update";
    editProfileLinkWidgetPopupToggled ? editProfileLinkWidgetPopup.style.display = "flex" : editProfileLinkWidgetPopup.style.display = "none";
    editProfileLinkWidgetPopupToggled ? linksContainer.style.display = "none" : linksContainer.style.display = "flex";
    editProfileLinkWidgetPopupToggled ? createProfileLinkWidgetButton.style.display = "none" : createProfileLinkWidgetButton.style.display = "flex";

    if (!editProfileLinkWidgetPopupToggled) { currentProfileLinkWidgetEdited = null; }
}

function validateNewProfileLinkWidgetCreation() {
    [profileLinkWidgetName, profileLinkWidgetUsername, profileLinkWidgetLink].forEach(property => {
        updateProfileLinkWidgetBtn.disabled = property.value == ""
    });
}

// Start the script by calling functons
initForm("edit-profile-form");
editProfileLinkWidgetPopup.style.display = "none";
await initPageInfos();
