console.log("Navbar - Script Loaded");

const V_BurgerMenuPopupButton = null
const V_BurgerMenu = null

function F_InitVariables() {
  V_BurgerMenuPopupButton = document.getElementById("navbar-burger-menu-popup-button");
  V_BurgerMenu = document.getElementById("navbar-burger-menu");
}

V_BurgerMenuPopupButton.addEventListener("click", function(e) {
  console.log("Navbar - Initializing Variables...");
  F_InitVariables();

  console.log("Navbar - Changing Burger Menu Display...");
  if (V_BurgerMenu.style.display == "none") {
    V_BurgerMenu.style.display = "flex";
  }
  else {
    V_BurgerMenu.style.display = "none";
  }
});