// IMPORTS
import { DB_MANAGER_INSTANCE } from "../db_manager.js";
import { loadHTML } from "../load_html.js";



// CONSTANTES
const MAX_PRESTATION_CARDS_PER_PAGE = 10;
const MIN_PRESPATION_PAGE_IDX = 1;
const DATA_BASE_PATH = "../../db/main_db.json";



// VARIABLES
// DOM Elements
let prestationsContainer = document.getElementById("prestations-container");
let previousPageBtn = document.getElementById("previous-page-btn");
let nextPageBtn = document.getElementById("next-page-btn");
let pageCounter = document.getElementById("page-counter");


// Other variables
let currentPageIdx = MIN_PRESPATION_PAGE_IDX;
let bookedPrestationsCount = 0;

previousPageBtn.addEventListener("click", () => {
    currentPageIdx -= 1;
    if (currentPageIdx < MIN_PRESPATION_PAGE_IDX) { currentPageIdx = MIN_PRESPATION_PAGE_IDX; }
    getBookedPrestations();
    updatePageListingSelectionContainer();
});
nextPageBtn.addEventListener("click", () => {
    currentPageIdx += 1;
    getBookedPrestations();
    updatePageListingSelectionContainer();
});



// Definition of functions
async function getBookedPrestations() {
    let data = await DB_MANAGER_INSTANCE.getData("prestations");

    bookedPrestationsCount = 0;
    let bookedPrestationsData = [];
    let bookedPrestationsIndexes = [];
    data.forEach((prestationEntry, index) => {
        if (prestationEntry.booked) {
            bookedPrestationsIndexes.push(index + 1);
            bookedPrestationsData.push(prestationEntry);
            bookedPrestationsCount++;
        }
    });

    let idxStart = (currentPageIdx - 1) * MAX_PRESTATION_CARDS_PER_PAGE;
    let idxEnd = MAX_PRESTATION_CARDS_PER_PAGE * currentPageIdx;
    bookedPrestationsData = bookedPrestationsData.slice(idxStart, idxEnd);
    bookedPrestationsIndexes = bookedPrestationsIndexes.slice(idxStart, idxEnd);
    listBookedPrestations(bookedPrestationsData, bookedPrestationsIndexes);
}

function listBookedPrestations(data, indexes) {
    prestationsContainer.innerHTML = "";
    data.forEach(async function (prestationEntry, index) {
        if (prestationEntry.booked) {
            await loadHTML("compenents/prestation_booked_card.html", "prestations-container");
        
            let prestationCard = prestationsContainer.lastElementChild;
            if (prestationCard) {
                let idx = indexes[index];
                let redirectionURL = `prestation_details_page.html?prestation_id=${idx}`;
                let actionsContainer = prestationCard.querySelector("#actions-container").children;
                for (let action of actionsContainer) { action.href = redirectionURL; }
                prestationCard.addEventListener("click", () => { window.location = redirectionURL; });
                
                prestationCard.querySelector("#prestation-title").innerText = prestationEntry.name;
                prestationCard.querySelector("#prestation-author").innerText = prestationEntry.author;
                prestationCard.querySelector("#prestation-category").innerText = prestationEntry.category;
            }
        }
    });
    updatePageListingSelectionContainer();
}

function updatePageListingSelectionContainer() {
    pageCounter.innerHTML = String(currentPageIdx);
    previousPageBtn.disabled = currentPageIdx <= MIN_PRESPATION_PAGE_IDX;
    nextPageBtn.disabled = bookedPrestationsCount <= (MAX_PRESTATION_CARDS_PER_PAGE * currentPageIdx);
}

// Start the script by calling functons
getBookedPrestations()
    .then(() => { updatePageListingSelectionContainer(); });
