// IMPORTS
import { loadHTML } from "../load_html.js";



// CONSTANTES
const MAX_NOTIFICATIONS_COUNT = 5;



// VARIABLES
// DOM Elements
let notificationCardsContainer = document.getElementById("notification-cards-container");

// Other variables
/* {code here} */

// Event Listeners
/* {code here} */



// Definition of functions
async function listNotifications() {
    let promises = [];
    for (let notificationCardIDX = 0; notificationCardIDX < MAX_NOTIFICATIONS_COUNT; notificationCardIDX++) {
        promises.push(loadHTML("compenents/notification_card.html", "notification-cards-container"));
    }

    await Promise.all(promises);
}

function allowNotificationsDeletion() {
    let notificationCardsDeleteBtns = document.querySelectorAll(".delete-notification-button");
    let notificationCards = document.querySelectorAll(".notification-card");

    let notificationCardIdx = 0;
    notificationCardsDeleteBtns.forEach(deleteBtn => {
        let notificationCard = notificationCards[notificationCardIdx];
        console.log(notificationCard);
        deleteBtn.addEventListener("click", notificationCards => deleteNotifiation(notificationCard) );
        notificationCardIdx++;
    })
}

function deleteNotifiation(notificationNode) {
    notificationCardsContainer.removeChild(notificationNode);
}

// Start the script by calling functons
await listNotifications();
allowNotificationsDeletion();