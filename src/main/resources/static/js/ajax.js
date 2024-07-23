document.getElementById("drawer").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sorteador", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var randomName = xhr.responseText;
            document.getElementById("drawResult").innerText = randomName;
        }
    };
    xhr.send();
});

document.getElementById("addSingleButton").addEventListener("click", function() {
    var nameInput = document.getElementById("singleInput").value;
    if (nameInput.trim() !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/adicionarUm", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                updateList([nameInput]);
                console.log("Nome Adicionado.");
            }
        };
        xhr.send("single=" + encodeURIComponent(nameInput));
        document.getElementById("singleInput").value = ""; // Clear input field
    } else {
        alert("Insira um nome.");
    }
});

document.getElementById("addListButton").addEventListener("click", function() {
    var listInput = document.getElementById("listInput").value;
    if (listInput.trim() !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/adicionarLista", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                updateList(listInput.split(",").map(name => name.trim()));
                console.log("Lista adicionada.");
            }
        };
        xhr.send("list=" + encodeURIComponent(listInput));
        document.getElementById("listInput").value = ""; // Clear input field
    } else {
        alert("Insira uma lista separada por vírgulas.");
    }
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

function updateList(names) {
    var nameListDiv = document.getElementById("list");
    names.forEach(function(name) {
        var nameItem = document.createElement("div");
        nameItem.innerText = name;
        nameListDiv.appendChild(nameItem);
    });
}

function clearNameList() {
    var listDiv = document.getElementById("list");
    var drawResultDiv = document.getElementById("drawResult");
    listDiv.innerHTML = "";
    drawResultDiv.innerHTML = "";
}
