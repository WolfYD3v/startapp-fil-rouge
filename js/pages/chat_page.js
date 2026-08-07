// IMPORTS
import { loadHTML } from "../load_html.js";
import "./setup_page.js";



// CONSTANTES
const ESCAPE_HTML = (str) =>
    str.replace(/[&<>"']/g, (match) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
const CHAT_BUBBLE_OTHER_USER = () => `
<div class="d-flex flex-row gap-2 align-items-end">
    <img class="chat-bubble-other-user-image" src="assets/images/other_user_image.jpg" alt="The profile picture of a other user">
    <p class="chat-bubble-user-text w-100 p-1 m-0" title="The other user message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ligula pretium, euismod turpis non, pretium arcu. Fusce sit amet neque in felis commodo accumsan vel a eros. Nunc euismod mauris non diam finibus, sit amet sodales est venenatis. Praesent sagittis volutpat est at tempus. Phasellus quis elementum leo. Nam quam sem, vestibulum vitae risus ac, laoreet pellentesque tortor. Nulla non varius risus, at imperdiet diam. Phasellus vel leo bibendum, vehicula est eu, efficitur tellus.</p>
</div>`
const CHAT_BUBBLE_USER = (message) => `
<div class="d-flex flex-row gap-2 align-items-end">
    <img class="chat-bubble-user-image" src="assets/images/user_image.jpg" alt="Your user profile picture">
    <p class="chat-bubble-user-text w-100 p-1 m-0" title="Your message">${ESCAPE_HTML(message)}</p>
</div>`



// VARIABLES
// DOM Elements
let messageText = document.getElementById("message-text");
let sendMessageBtn = document.getElementById("send-message-btn");
let messagesContainer = document.getElementById("messages-container");

// Other variables
/* {code here} */

// Event Listeners
sendMessageBtn.addEventListener("click", () => {
    let message = messageText.value; // Get the message to send, from the textarea
    messageText.value = ""; // Clear the textarea mssage

    if (message != "") {
        messagesContainer.insertAdjacentHTML("beforeend", CHAT_BUBBLE_USER(message));
        messagesContainer.lastElementChild.scrollIntoView();

        // Automatic answer (with a random delay) because users can't communicate with others
        setTimeout(() => {
            messagesContainer.insertAdjacentHTML("beforeend", CHAT_BUBBLE_OTHER_USER());
            messagesContainer.lastElementChild.scrollIntoView();
        }, Math.random() * 500);
    }
});



// Definition of functions
/* {code here} */

// Start the script by calling functons
/* {code here} */