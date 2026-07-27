import "../load_html.js"



const MAX_PRESTATION_CARDS_PER_PAGE = 10;
const MIN_PRESPATION_PAGE_IDX = 1;
const DATA_BASE_PATH = "../../db/main_db.json";



let prestationsContainer = document.getElementById("prestations-container");
let previousPageBtn = document.getElementById("previous-page-btn");
let nextPageBtn = document.getElementById("next-page-btn");
let pageCounter = document.getElementById("page-counter");

let currentPageIdx = MIN_PRESPATION_PAGE_IDX;
let avaiblePrestationsCount = 0;

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



function getAvaiblePrestations() {   
    var promise = fetch(DATA_BASE_PATH)
        .then(response => {
            if (response.ok) { return response.json() }
            else { return response.json().then(obj => { throw obj }) }
        })
        .then(data => listAvaiblePrestations(data))
        .catch(error => showListingError(error));
    
    return promise
}

function listAvaiblePrestations(data) {
    avaiblePrestationsCount = data.avaiblePrestations.length;
    let sliceIdxStart = (currentPageIdx - 1) * MAX_PRESTATION_CARDS_PER_PAGE;
    let sliceIdxEnd = MAX_PRESTATION_CARDS_PER_PAGE * currentPageIdx;
    data = data.avaiblePrestations.slice(sliceIdxStart, sliceIdxEnd)

    prestationsContainer.innerHTML = "";
    data.forEach(prestationEntry => {
        loadHTML("compenents/prestation_card.html", "prestations-container");
    });
}

function showListingError(error) {
    console.log(error);
}

function updatePageListingSelectionContainer() {
    pageCounter.innerHTML = String(currentPageIdx);
    previousPageBtn.disabled = currentPageIdx <= MIN_PRESPATION_PAGE_IDX;
    nextPageBtn.disabled = avaiblePrestationsCount <= (MAX_PRESTATION_CARDS_PER_PAGE * currentPageIdx);
}

getAvaiblePrestations()
    .then(() => { updatePageListingSelectionContainer(); });