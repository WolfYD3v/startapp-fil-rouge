function loadHTML(V_HTMLFilePath, V_ElementId) {
    console.log(`HTML Loader - Loading HTML File '${V_HTMLFilePath}' For Element with Id '${V_ElementId}' ...`);
    let success = false;

    fetch(V_HTMLFilePath)
        .then(response => response.text())
        .then(text => document.getElementById(V_ElementId).innerHTML += text)
        .then(text => success = true)
        .catch(error => success = false);
    
    return success
}