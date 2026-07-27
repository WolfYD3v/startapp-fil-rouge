let navbarBurgerMenu;
let toggleNavbarBurgerMenuBtn;
let visible = true;

export function tryInitNavbarBurgerMenu() {
    navbarBurgerMenu = document.getElementById("navbar-burger-menu");
    toggleNavbarBurgerMenuBtn = document.getElementById("toggle-navbar-burger-menu-btn");
    console.log(navbarBurgerMenu);
    console.log(toggleNavbarBurgerMenuBtn);
    if (toggleNavbarBurgerMenuBtn && navbarBurgerMenu) {
        toggleNavbarBurgerMenuBtn.addEventListener("click", () => {
            toggleNavbarBurgerMenu();
        });
    }
}

function toggleNavbarBurgerMenu() {
    visible = !visible;
    navbarBurgerMenu.classList.toggle("d-flex", visible);
    navbarBurgerMenu.classList.toggle("d-none", !visible);
}

/*
$(document).ready(function() {
    $("#toggle-navbar-burger-menu-btn").click(function() {
        $("#navbar-burger-menu").stop(true, true).slideToggle(15000)
    })
})
*/
