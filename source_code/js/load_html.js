function F_LoadHTML(V_HTMLFilePath, V_ElementId) {
    console.log(`Loading HTML File '${V_HTMLFilePath}' for element with Id '${V_ElementId}' ...`);

    fetch(V_HTMLFilePath)
        .then(response => response.text())
        .then(text => document.getElementById(V_ElementId).innerHTML += text)
}