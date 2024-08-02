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

function triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

let participantsAdded = false;

document.getElementById("drawer").addEventListener("click", function() {

    if (!participantsAdded) {
        addParticipants();
        updateList();
    }

    var nameQnt = document.getElementById("nameQuantity");

    // Clear previously drawn names
    const drawResult = document.getElementById("drawResult");
    drawResult.innerHTML = '';

    const notDrawnNames = updateList();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/drawer", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const drawnNames = xhr.responseText.split(',').map(name => name.trim());
            startRoulette(notDrawnNames, function() {
                // Create a new container for the names
                const nameContainer = document.createElement('div');
                nameContainer.className = 'name-container';
                drawnNames.forEach(name => {
                    const div = document.createElement('div');
                    div.textContent = name;
                    div.className = 'fade-in blurred name-item';
                    div.addEventListener('click', function() {
                        if (this.classList.contains('blurred')) {
                            this.classList.remove('blurred');
                            triggerConfetti();
                        }
                    });
                    nameContainer.appendChild(div);
                });
                drawResult.appendChild(nameContainer);
                updateList();
            });
        }
    };
    xhr.send("nameQnt=" + encodeURIComponent(nameQnt.value));
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
    xhr.send();

    if (xhr.status === 200) {
        let notDrawnNames = JSON.parse(xhr.responseText);
        var listInput = document.getElementById("listInput");
        listInput.value = notDrawnNames;
        return notDrawnNames;
    }

}

function clearNameList() {
    var listDiv = document.getElementById("list");
    var drawResultDiv = document.getElementById("drawResult");
    participantsAdded = false;

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
