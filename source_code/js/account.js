const C_RedirectionLinks = {
    "login": "http://www.w3schools.com", // Temporary Link, Create Login Page First (TODO)
    "sign_in": "http://www.google.com",  // Temporary Link, Create SignIn Page First (TODO)
};

function F_CheckForAccount() {
    const C_HaveAccount = false; // Add A Real Check Much More Later (TODO)
    var V_RedirectionLink = "";

    if (C_HaveAccount) { V_RedirectionLink = C_RedirectionLinks["login"]; }
    else { V_RedirectionLink = C_RedirectionLinks["sign_in"]; }

    if (V_RedirectionLink != "") { window.location.replace(V_RedirectionLink); }
}
