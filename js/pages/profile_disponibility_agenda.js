// IMPORTS
import { loadHTML } from "../load_html.js";
import "./setup_page.js";



// CONSTANTES
const MAX_PRESTATIONS_LISTED_AT_ONCE = 5;
const TEMP_TOTAL_PRESTATIONS_COUNT = 22;



// VARIABLES
// DOM Elements
let seeMorePrestationsBtn = document.getElementById("see-more-prestations-btn");
let container = document.getElementById("container");
let montlyPrestationsListContainer = document.getElementById("montly-prestations-list-container");

// Other variables
let prestationsListedCount = 0;

// Event Listeners
seeMorePrestationsBtn.addEventListener("click", listPrestations);


// Definition of functions
async function listPrestations() {
    let iterrations = MAX_PRESTATIONS_LISTED_AT_ONCE;

    // Upate the count of prestations listed on the page
    prestationsListedCount += MAX_PRESTATIONS_LISTED_AT_ONCE

    // If the count of the prestations listed on the page is sperior than the temporary total count of prestations fixed,
    // calculate the iterrations to do in the loop to not have more than {TEMP_TOTAL_PRESTATIONS_COUNT} prestations listed
    if (prestationsListedCount > TEMP_TOTAL_PRESTATIONS_COUNT) {
        iterrations = 0;
        while (prestationsListedCount > TEMP_TOTAL_PRESTATIONS_COUNT) {
            iterrations++;
            prestationsListedCount--;
        }
        iterrations--;

        // Then destroy the button to list more prestations
        container.removeChild(seeMorePrestationsBtn);
        container.insertAdjacentHTML("beforeend", "<h4 class='d-flex flex-row w-100 justify-content-center'>No more prestations to list from ${this user}</h4>")
    }
    console.log(iterrations);
    console.log(prestationsListedCount);

    // List {itterations} prestations more
    for (let idx = 0; idx < iterrations; idx++) {
        await loadHTML("compenents/profile_disponibility_agenda_day_card.html", "montly-prestations-list-container");

        let agandaDayCard = montlyPrestationsListContainer.lastElementChild;
        console.log(agandaDayCard);
        agandaDayCard.addEventListener("click", () => {
            window.location = "prestation_details_page.html";
        });
    }
}

// Start the script by calling functons
listPrestations();