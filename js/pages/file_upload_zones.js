let fileUploadZones = document.querySelectorAll(".file-upload-zone");

fileUploadZones.forEach(fileUploadZone => {
    let fileUploadZoneImage = fileUploadZone.querySelector("img");
    let fileUploadZoneInput = fileUploadZone.querySelector("input");

    // Try get the id of the fileUploadZone, as the key for the file in the localStorage
    // (if the id exists, we do not know what wrong can happen)
    let localStorageKey = fileUploadZone.id;
    if (!localStorageKey) {
        console.warn(`WARNING: ID ${localStorageKey} does not exist in this page! Cannot initialize the file upload zone.`);
        return
    }

    // Try load a saved file if the key exists in the localStorage
    let savedFile = localStorage.getItem(localStorageKey);
    if (savedFile) { fileUploadZoneImage.src = savedFile; }

    fileUploadZoneInput.addEventListener("change", () => {
        let file = fileUploadZoneInput.files[0];

        if (file) {
            let fileReader = new FileReader();
            fileReader.addEventListener("load", (event) => {
                let base64String = event.target.result;
                fileUploadZoneImage.src = base64String;
                
                try {
                    localStorage.setItem(localStorageKey, base64String);
                } catch (error) {
                    console.error(`ERROR: Cannot save the file in localStorage! ${error}`);
                    alert("The file size is too big to be stored locally");
                }
            });
            fileReader.readAsDataURL(file);
        }
    });
});