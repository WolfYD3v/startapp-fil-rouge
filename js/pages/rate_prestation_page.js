// VARIABLES
// DOM Elements
let ratingForm = document.getElementById("rating-form");
let prestationTookPlaceBtn = document.getElementById("prestation-took-place-btn");
let prestationNotTookPlaceBtn = document.getElementById("prestation-not-took-place-btn");
let starsContainer = document.getElementById("stars-container");
let submitButton = document.getElementById("submit-button");
let stars = starsContainer.querySelectorAll(".rating-star");

// Other variables
let prestationTookPlace = false;
let registeredStarsCount = 0;

// Event Listeners
prestationTookPlaceBtn.addEventListener("click", () => {
    prestationTookPlace = true;
    toggleRatingContainer(prestationTookPlace);
});
prestationNotTookPlaceBtn.addEventListener("click", () => {
    prestationTookPlace = false;
    toggleRatingContainer(prestationTookPlace);
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (prestationTookPlace) { alert("Review Submited !"); }
    else { alert("We are sorry to hear that, we will do our best to prevent this kind of behavoir happend again on our platform"); }
    window.location.href = "prestation_details_page.html?prestation_id=1";
});



// Definition of functions
function toggleRatingContainer(value = false) {
    ratingForm.classList.toggle("rating-section-visible", !value);
    starsContainer.classList.toggle("rating-section-visible", !value);
}

function initStars() {
    stars.forEach((star, idx) => {
        star.addEventListener("click", () => updateStars(idx + 1) );
        star.addEventListener("mouseenter", () => updateStarsHovering(idx + 1, true));
        star.addEventListener("mouseout", () => updateStarsHovering(registeredStarsCount, false) );
    });
}

function updateStars(starsGiven = 0) {
    registeredStarsCount = starsGiven;
    var starActivated = false;
    stars.forEach((star, starIdx) => {
        starActivated = starIdx + 1 <= starsGiven;
        starActivated ? star.innerHTML = "★" : star.innerHTML = "☆";
        star.classList.toggle("rating-star-not-activated", !starActivated);
        star.classList.toggle("rating-star-activated", starActivated);
        star.classList.toggle("star-hovered", false);
    });
}

function updateStarsHovering(starsGiven = 0, hovering = false) {
    var starActivated = false;
    stars.forEach((star, starIdx) => {
        starActivated = starIdx + 1 <= starsGiven;
        starActivated ? star.innerHTML = "★" : star.innerHTML = "☆";
        star.classList.toggle("rating-star-not-activated", !starActivated);
        star.classList.toggle("rating-star-activated", starActivated);
        if (starActivated || !hovering) { star.classList.toggle("star-hovered", hovering); }
    });
}

// Start the script by calling functons
toggleRatingContainer(false);
initStars();
