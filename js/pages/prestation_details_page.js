// IMPORTS
import { DB_MANAGER_INSTANCE } from "../db_manager.js";
import { loadHTML } from "../load_html.js";
import { getURLArgument } from "../get_url_arument.js";



// CONSTANTES
const MAX_STARS_COUNT = 5;



// VARIABLES
// DOM Elements
let buttonsContainer = document.getElementById("buttons-container");
let ratingCounter = document.getElementById("rating-counter");
let starsContainer = document.getElementById("stars-container");
let rateBtn = document.getElementById("rate-btn");
let bookCancelBtn = document.getElementById("book-cancel-btn");

let prestationName = document.getElementById("prestation-name");
let prestationAuthor = document.getElementById("prestation-author");
let category = document.getElementById("category");
let description = document.getElementById("description");

// Other variables
let prestationBooked = false;

// Event Listeners
bookCancelBtn.addEventListener("click", () => {
    prestationBooked = !prestationBooked;
    updateButtons();
});



// Definition of functions
async function init() {
    let prestationId = Number(getURLArgument("prestation_id")) - 1;
    console.log(prestationId)
    let data = await DB_MANAGER_INSTANCE.getData("prestations")
    data = data[prestationId];
    console.log(data)
    prestationBooked = data.booked;
    prestationName.innerText = data.name;
    prestationAuthor.innerText = data.author;
    category.innerText = data.category;
    description.innerText = data.description;

    updateButtons();
    createStars(data.stars);
    loadReviews();
}

function updateButtons() {
    // Update the rate button display value (to make it visible or not)
    prestationBooked ? rateBtn.style.display = "flex" : rateBtn.style.display = "none"
    // Update the text of the button to book/cancel a prestation
    prestationBooked ? bookCancelBtn.innerText = "cancel" : bookCancelBtn.innerText = "book"
}

function createStars(stars) {
        ratingCounter.innerText = `${stars} / ${MAX_STARS_COUNT}`;

        for (let starIterationIdx = 0; starIterationIdx < MAX_STARS_COUNT; starIterationIdx++) {
            if (starIterationIdx <  stars) { starsContainer.innerHTML += "<h2 class='as rating-star-activated'>★</h2>"; }
            else { starsContainer.innerHTML += "<h2 class='as rating-star-not-activated'>☆</h2>"; }
        }
    }

function loadReviews() {
    // Random number generated for now, as a temporary implementation
    let totalReviewsCount = Math.floor(Math.random() * (10 - 1)) + 1;
    
    for (let loop = 0; loop < totalReviewsCount; loop++) {
        loadHTML("compenents/user_review.html", "reviews");
    }
}



// Start the script by calling functons
await init();
