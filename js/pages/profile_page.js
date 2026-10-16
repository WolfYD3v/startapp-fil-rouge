// IMPORTS
import { DB_MANAGER_INSTANCE } from "../db_manager.js";
import { loadHTML } from "../load_html.js"
import "./setup_page.js"



// VARIABLES
// DOM Elements
let linksContainer = document.getElementById("links-container");
let profileName = document.getElementById("profile-name");
let information = document.getElementById("information");
let description = document.getElementById("description");
let joiningDate = document.getElementById("joining-date");

// Event Listeners
linksContainer.addEventListener("wheel", (event) => {
    if (event.deltaY !== 0) { event.preventDefault(); }
    linksContainer.scrollBy({
        left: event.deltaY,
        behavior: 'auto'
    });
}, { passive: false });



async function initPageInfos() {
    let profileData = await DB_MANAGER_INSTANCE.getData("users.1");
    let infos = profileData.infos;
    profileName.innerText = infos.username;
    information.innerText = infos.displayedInformation;
    description.innerText = infos.description;
    joiningDate.innerHTML = `Joined at ${infos.joiningDate}`;

    await createProfileLinkWidgets(profileData.widgetLinks);
}

async function createProfileLinkWidgets(linksData) {
    Object.values(linksData).forEach(async function(linkData) {
        await loadHTML("compenents/profile_link_widget_bis.html", "links-container");

        let profileLinkWidget = linksContainer.lastElementChild;
        if (profileLinkWidget) {
            updateLinkWidgetBtnInfos(profileLinkWidget, linkData);
            profileLinkWidget.addEventListener("click", () => { window.open(linkData.link, '_blank').focus(); });
        }
    });
}

function updateLinkWidgetBtnInfos(linkWidgetBtn, data) {
    linkWidgetBtn.querySelector("#link-name").innerText = data.name;
    linkWidgetBtn.querySelector("#link-username").innerText = data.username;
}



// Start the script by calling functons
await initPageInfos();