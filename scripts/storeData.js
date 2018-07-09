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

function makeFileEntry(file, fileName, column) {
    debugger;
    fileId = newFileId();
    makeLocalEntry(fileId);
    firebase.database().ref('files/' + fileId).set({
        fileName: fileName,
        column: column,
        status: "processing",
        result: "Waiting",
        localFilePath: "TBS"
    });
    debugger;
    triggerTheJob(getBase64(file), fileName, column, fileId);
}

function makeLocalEntry(fileId) {
    if (!localStorage.eMiLyFiles) {
        localStorage.eMiLyFiles = "[]";
    }
    var eMiLyFileList = JSON.parse(localStorage.eMiLyFiles);
    eMiLyFileList.push(fileId);
    if (typeof (Storage) !== "undefined") {
        localStorage.eMiLyFiles = JSON.stringify(eMiLyFileList);
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
}

function triggerTheJob(file_stream, file_name, column_name, file_id) {
    fetch(
        "http://localhost:8080/postjob",
        {
            body: '{ "file_stream": "' + file_stream + '", "file_name": "' + file_name + '", "column_name": "' + column_name + '", "file_id": "' + file_id + '" }',
            headers: {
                "Content-Type": "application/json"
            },
            // credentials: "same-origin",
            method: "POST"
        })
        .then(response => response.json())
        .then(data => alert(data))
        .catch(error => console.error("Error:", error));
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
