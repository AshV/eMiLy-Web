var database = firebase.database();

function newFileId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return "File-" + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var fileId = "";

function makeFileEntry(fileName, column) {
    fileId = newFileId();
    makeLocalEntry(fileId);
    firebase.database().ref('files/' + fileId).set({
        fileName: fileName,
        column: column
    });
}

function makeLocalEntry(fileId) {
    if (!localStorage.eMiLyFiles) {
        localStorage.eMiLyFiles = "[]";
    }
    var eMiLyFileList = JSON.parse(localStorage.eMiLyFiles);
    eMiLyFileList(fileId);
    if (typeof (Storage) !== "undefined") {
        localStorage.eMiLyFiles = JSON.stringify(eMiLyFileList);
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
}