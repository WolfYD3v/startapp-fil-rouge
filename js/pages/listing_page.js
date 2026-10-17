// IMPORTS
import { DB_MANAGER_INSTANCE } from "../db_manager.js";
import { loadHTML } from "../load_html.js";



// CONSTANTES
const MAX_PRESTATION_CARDS_PER_PAGE = 10;
const MIN_PRESPATION_PAGE_IDX = 1;



// VARIABLES
// DOM Elements
let prestationsContainer = document.getElementById("prestations-container");
let previousPageBtn = document.getElementById("previous-page-btn");
let nextPageBtn = document.getElementById("next-page-btn");
let pageCounter = document.getElementById("page-counter");

// Other variables
let currentPageIdx = MIN_PRESPATION_PAGE_IDX;
let avaiblePrestationsCount = 0;

// Event Listeners
previousPageBtn.addEventListener("click", () => {
    currentPageIdx -= 1;
    if (currentPageIdx < MIN_PRESPATION_PAGE_IDX) { currentPageIdx = MIN_PRESPATION_PAGE_IDX; }
    getAvaiblePrestations();
    updatePageListingSelectionContainer();
});
nextPageBtn.addEventListener("click", () => {
    currentPageIdx += 1;
    getAvaiblePrestations();
    updatePageListingSelectionContainer();
});



// Definition of functions
async function getAvaiblePrestations() {
    let data = await DB_MANAGER_INSTANCE.getData("prestations");


    avaiblePrestationsCount = 0;
    let avaiblePrestationsData = [];
    let avaiblePrestationsIndexes = [];
    data.forEach((prestationEntry, index) => {
        if (!prestationEntry.booked) {
            avaiblePrestationsIndexes.push(index + 1);
            avaiblePrestationsData.push(prestationEntry);
            avaiblePrestationsCount++;
        }
    });

    let idxStart = (currentPageIdx - 1) * MAX_PRESTATION_CARDS_PER_PAGE;
    let idxEnd = MAX_PRESTATION_CARDS_PER_PAGE * currentPageIdx;
    avaiblePrestationsData = avaiblePrestationsData.slice(idxStart, idxEnd);
    avaiblePrestationsIndexes = avaiblePrestationsIndexes.slice(idxStart, idxEnd);
    listAvaiblePrestations(avaiblePrestationsData, avaiblePrestationsIndexes);
}

function listAvaiblePrestations(data, indexes) {
    prestationsContainer.innerHTML = "";
    data.forEach(async function (prestationEntry, index) {
        if (!prestationEntry.booked) {
            await loadHTML("compenents/prestation_card.html", "prestations-container");
    
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
                prestationCard.querySelector("#prestation-card-price-info").innerText = `Price: ${prestationEntry.price}$`;
            }
        }
    });
    updatePageListingSelectionContainer();
}

function updatePageListingSelectionContainer() {
    pageCounter.innerHTML = String(currentPageIdx);
    previousPageBtn.disabled = currentPageIdx <= MIN_PRESPATION_PAGE_IDX;
    nextPageBtn.disabled = avaiblePrestationsCount <= (MAX_PRESTATION_CARDS_PER_PAGE * currentPageIdx);
}

// Start the script by calling functons
getAvaiblePrestations()
    .then(() => { updatePageListingSelectionContainer(); });