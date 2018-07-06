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
        column: column,
        status: "processing",
        result: "Waiting",
        localFilePath: "TBS"
    });
    triggerTheJob("PCFET0NUWVBFIGh0bWw+DQo8aHRtbD4NCjxoZWFkPg0KICAgIDx0aXRsZT5lTWlMeSB8IFJlc3VsdHM8L3RpdGxlPg0KICAgIDxzY3JpcHQgc3JjPSJodHRwczovL3d3dy5nc3RhdGljLmNvbS9maXJlYmFzZWpzLzUuMS4wL2ZpcmViYXNlLWFwcC5qcyI+PC9zY3JpcHQ+DQogICAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vd3d3LmdzdGF0aWMuY29tL2ZpcmViYXNlanMvNS4xLjAvZmlyZWJhc2UtZGF0YWJhc2UuanMiPjwvc2NyaXB0Pg0KICAgIDxzY3JpcHQgc3JjPSJodHRwczovL3d3dy5nc3RhdGljLmNvbS9maXJlYmFzZWpzLzUuMS4wL2ZpcmViYXNlLmpzIj48L3NjcmlwdD4NCiAgICA8c2NyaXB0Pg0KICAgICAgICAvLyBJbml0aWFsaXplIEZpcmViYXNlDQogICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCB5b3VyIHByb2plY3QncyBjdXN0b21pemVkIGNvZGUgc25pcHBldA0KICAgICAgICB2YXIgY29uZmlnID0gew0KICAgICAgICAgICAgYXBpS2V5OiAiPEFQSV9LRVk+IiwNCiAgICAgICAgICAgIGF1dGhEb21haW46ICI8UFJPSkVDVF9JRD4uZmlyZWJhc2VhcHAuY29tIiwNCiAgICAgICAgICAgIGRhdGFiYXNlVVJMOiAiaHR0cHM6Ly9vdXRsYXlzdG9yZS5maXJlYmFzZWlvLmNvbSIsDQogICAgICAgICAgICBwcm9qZWN0SWQ6ICI8UFJPSkVDVF9JRD4iLA0KICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogIjxCVUNLRVQ+LmFwcHNwb3QuY29tIiwNCiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiAiPFNFTkRFUl9JRD4iLA0KICAgICAgICB9Ow0KICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7DQogICAgPC9zY3JpcHQ+DQogICAgPHNjcmlwdCBzcmM9InNjcmlwdHNcc3RvcmVEYXRhLmpzIj48L3NjcmlwdD4NCg0KPC9oZWFkPg0KPGJvZHk+DQoNCjwvYm9keT4NCjwvaHRtbD4=", fileName, column, fileId);
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
            body: '{ "file_stream": "' + file_stream + '", "file_name": "' + file_name + '", "column_name": "' + column_name + '", "file_id": "' + file_id+'" }',
            headers: {
                "Accept": "application/json"
            },
           // credentials: "same-origin",
            method: "POST"
        })
        .then(response => response.json())
        .then(data => alert(data))
        .catch(error => console.error("Error:", error));
}