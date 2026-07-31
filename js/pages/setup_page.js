import { tryInitNavbarBurgerMenu } from "../compenents/navbar_burger_menu.js";
import { loadHTML } from "../load_html.js";

async function init() {
    await Promise.all([
        loadHTML("compenents/footer.html", "footer-container"),
        loadHTML("compenents/navbar.html", "navbar-container")
    ]);

    tryInitNavbarBurgerMenu();
}

await init();