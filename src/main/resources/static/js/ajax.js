document.getElementById("drawer").addEventListener("click", function() {

    addParticipants();

    var nameQnt = document.getElementById("nameQuantity");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/drawer", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("drawResult").innerText = xhr.responseText;
        }
    };

    xhr.send("nameQnt=" + encodeURIComponent(nameQnt.value));
    nameQnt.value = "";
    updateList();
});



document.getElementById("clearListButton").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/clear", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            clearNameList();
            console.log("Lista limpa.");
        }
    };
    xhr.send();
});

function addParticipants() {
    var listInput = document.getElementById("listInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/add", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("list=" + encodeURIComponent(listInput));
    document.getElementById("listInput").value = "";
    updateList();
}

function updateList() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/update", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var listDiv = document.getElementById("list");
            listDiv.innerHTML = "";
            data.forEach(function(item) {
                var div = document.createElement("div");
                div.textContent = item;
                listDiv.appendChild(div);
            });
        } else if (xhr.readyState === 4) {
            console.error("Error:", xhr.statusText);
        }
    };
    xhr.send();

}

function clearNameList() {
    var listDiv = document.getElementById("list");
    var drawResultDiv = document.getElementById("drawResult");
    listDiv.innerHTML = "";
    drawResultDiv.innerHTML = "";
}
