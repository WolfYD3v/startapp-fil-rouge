function F_RedirectTo(V_Link) {
    window.location.replace(V_Link);
}
function F_Login() {
    F_RedirectTo('http://www.w3schools.com'); // Temporary Link, Create Login Page First (TODO)
}
function F_SignIn() {
    F_RedirectTo('http://www.google.com'); // Temporary Link, Create SignIn Page First (TODO)
}

function F_CheckForAccount() {
    var V_HaveAccount = false; // Add A Real Check Much More Later (TODO)

    if (V_HaveAccount) { F_Login(); }
    else { F_SignIn(); }
}
