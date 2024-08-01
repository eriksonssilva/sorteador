// Roulette animation function
function startRoulette(names, callback) {
    const rouletteContainer = document.getElementById('rouletteContainer');
    const roulette = document.getElementById('roulette');
    rouletteContainer.style.display = 'block';
    roulette.innerHTML = '';

    // If no names are provided, use a default message
    if (names.length === 0) {
        callback();
        return;
    }

    // Ensure we have at least 10 items for a good animation
    let rouletteNames = [...names];
    while (rouletteNames.length < 10) {
        rouletteNames = [...rouletteNames, ...names];
    }

    // Populate roulette with names
    rouletteNames.forEach(name => {
        const div = document.createElement('div');
        div.className = 'roulette-item';
        div.textContent = name;
        roulette.appendChild(div);
    });

    // Clone first few items to create a seamless loop
    for (let i = 0; i < 3; i++) {
        const clone = roulette.children[i].cloneNode(true);
        roulette.appendChild(clone);
    }

    let position = 0;
    const itemHeight = 60;
    const totalHeight = itemHeight * rouletteNames.length;

    function spin() {
        position += itemHeight;
        if (position >= totalHeight) {
            position = 0;
        }
        roulette.style.top = `-${position}px`;
    }

    // Spin for a random duration between 2 and 4 seconds
    const duration = 2000 + Math.random() * 2000;
    const interval = setInterval(spin, 100);

    setTimeout(() => {
        clearInterval(interval);
        rouletteContainer.style.display = 'none';
        callback();
    }, duration);
}

let participantsAdded = false;

document.getElementById("drawer").addEventListener("click", function() {
    if (!participantsAdded) {
        addParticipants();
        updateList();
    }
    var nameQnt = document.getElementById("nameQuantity");

    // First, fetch the list of not drawn names
    var notDrawnXhr = new XMLHttpRequest();
    notDrawnXhr.open("GET", "/notDrawn", false);
    notDrawnXhr.send();

    if (notDrawnXhr.status === 200) {
        const notDrawnNames = JSON.parse(notDrawnXhr.responseText);

        // Now proceed with the drawing
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/drawer", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const drawnNames = xhr.responseText.split(',').map(name => name.trim());
                startRoulette(notDrawnNames, function() {
                    const drawResult = document.getElementById("drawResult");
                    drawResult.innerHTML = '';
                    drawnNames.forEach(name => {
                        const div = document.createElement('div');
                        div.textContent = name;
                        div.className = 'fade-in';
                        drawResult.appendChild(div);
                    });
                    updateList();
                });
            }
        };
        xhr.send("nameQnt=" + encodeURIComponent(nameQnt.value));
    } else {
        console.error("Failed to fetch not drawn names");
        alert("Error: Unable to fetch names for drawing.");
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

function addParticipants() {
    var listInput = document.getElementById("listInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/add", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("list=" + encodeURIComponent(listInput));
    participantsAdded = true;
}

function updateList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/update", false);
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

    // Add fade-out animation
    Array.from(listDiv.children).forEach(child => {
        child.className = 'fade-out';
    });
    Array.from(drawResultDiv.children).forEach(child => {
        child.className = 'fade-out';
    });

    // Clear after animation
    setTimeout(() => {
        listDiv.innerHTML = "";
        drawResultDiv.innerHTML = "";
    }, 500);
}