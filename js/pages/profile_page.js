// IMPORTS
import { loadHTML } from "../load_html.js"
import "./setup_page.js"



// VARIABLES
// DOM Elements
let linksContainer = document.getElementById("links-container");

// Event Listeners
linksContainer.addEventListener("wheel", (event) => {
    if (event.deltaY !== 0) { event.preventDefault(); }
    linksContainer.scrollBy({
        left: event.deltaY,
        behavior: 'auto'
    });
}, { passive: false });



// Start the script by calling functons
loadHTML("compenents/profile_link_widget.html", "links-container");
loadHTML("compenents/profile_link_widget.html", "links-container");
loadHTML("compenents/profile_link_widget.html", "links-container");
loadHTML("compenents/profile_link_widget.html", "links-container");
loadHTML("compenents/profile_link_widget.html", "links-container");