document.addEventListener("DOMContentLoaded", initRender);

window.addEventListener("resize", () => {
    const circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {
        updateCircle(circle);
    });
});

const config = {
    circleCount: 75,
    minSize: 40,
    maxSize: 150,
    changeInterval: 3000,
    transitionDuration: 500,
}

function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    return circle;
}

function getRandomSize() {
    return Math.floor(Math.random() * (config.maxSize - config.minSize)) + config.minSize;
}

function getRandomPosition(size) {
    const x = Math.floor(Math.random() * (window.innerWidth - size));
    const y = Math.floor(Math.random() * (window.innerHeight - size));
    return { x, y };
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function updateCircle(circle) {
    const size = getRandomSize();
    const position = getRandomPosition(size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${position.x}px`;
    circle.style.top = `${position.y}px`;
    circle.style.backgroundColor = getRandomColor();
}

function initRender() {
    const circlesContainer = document.getElementById("circles-container");
    
    for (let i = 0; i < config.circleCount; i++){
        const circle = createCircle();
        updateCircle(circle);
        circlesContainer.appendChild(circle);
    }

    setInterval(() => {
        const circles = document.querySelectorAll(".circle");
        circles.forEach(circle => {
            updateCircle(circle);
        }); 
    }, config.changeInterval);

    const ProfilDiv = document.createElement("div");
    if(ProfilDiv){
        ProfilDiv.classList.add("profil");
        ProfilDiv.id = "profil";
        ProfilDiv.innerHTML = `<h1>Zkevitz</h1>`
    }
    const navBar = document.createElement("div");
    if(navBar){
        navBar.classList.add("navbar");
        navBar.innerHTML = `<ul class = "nav-list">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        </ul>`;
    }
    const main = document.getElementById("main");
    circlesContainer.appendChild(ProfilDiv);
    //  ProfilDiv.appendChild(navBar);
    main.appendChild(navBar);
}

    
