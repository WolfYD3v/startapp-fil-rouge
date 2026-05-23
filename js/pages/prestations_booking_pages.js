import * as monModule from "../load_html.js";

const C_PagePrestationsLeftButton = document.getElementById("page-prestations-left-button");
const C_PagePrestationsRightButton = document.getElementById("page-prestations-right-button");
const C_PagePrestationsCounter = document.getElementById("page-prestations-counter");

const C_MaxPrestationCardsPerPage = 10;

const C_MinPageCount = 1;
const C_MaxPageCount = F_SetMaxPageCount();
var V_CurrentPageCount = 1;

function F_SetMaxPageCount() {
    // To define later:
    // {nb_reservations} / 10 -> {nb_pages}
    return 5;
}

function F_SetButtonsDisable() {
    C_PagePrestationsLeftButton.disabled = V_CurrentPageCount <= C_MinPageCount;
    C_PagePrestationsRightButton.disabled = V_CurrentPageCount >= C_MaxPageCount;
}

export function F_PreviousPage() {
    if (V_CurrentPageCount - 1 >= C_MinPageCount) {
        V_CurrentPageCount -= 1;
        C_PagePrestationsCounter.innerText = String(V_CurrentPageCount);
        F_SetButtonsDisable();
        F_ResetPrestations();
        }
    }

export function F_NextPage() {
    if (V_CurrentPageCount + 1 <= C_MaxPageCount) {
        V_CurrentPageCount += 1;
        C_PagePrestationsCounter.innerText = String(V_CurrentPageCount);
        F_SetButtonsDisable();
        F_ResetPrestations();
    }
}

function F_ClearPrestations() {
    document.getElementById("prestations-container").innerHTML = ""
}

function F_LoadPrestations() {
    for (let V_PrestationCardIDX = 0; V_PrestationCardIDX < C_MaxPrestationCardsPerPage; V_PrestationCardIDX++) {
        monModule.F_LoadHTML("compenents/prestation_booked_card.html", "prestations-container")
    }
}

function F_ResetPrestations() {
    F_ClearPrestations();
    F_LoadPrestations();
}

F_SetButtonsDisable();
F_LoadPrestations();