const V_AllowRedirection = false;
const V_HaveAccount = false;

function F_RedirectTo(V_Link) {
    window.location.replace(V_Link);
}
function F_Login() {
    F_RedirectTo('http://www.w3schools.com');
}
function F_SignIn() {
    F_RedirectTo('http://www.google.com');
}

if (V_AllowRedirection) {
    if (V_HaveAccount) { F_Login(); }
    else { F_SignIn(); }
}
