console.log("d");

const C_BurgerMenuPopupButton = document.getElementById("navbar-burger-menu-popup-button");
const C_BurgerMenu = document.getElementById("navbar-burger-menu");

C_BurgerMenuPopupButton.addEventListener("click", function(e) {
  console.log(this.id);
  console.log(e.currentTarget === this);

  if (C_BurgerMenu.style.display == "none") {
    C_BurgerMenu.style.display = "flex";
  }
  else {
    C_BurgerMenu.style.display = "none";
  }
});