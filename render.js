import { ElementCreator } from './CreateElement.js';
import { currentLanguage } from './CreateElement.js';
import { switchCurrentLanguage } from './CreateElement.js';

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
    changeInterval: 8000,
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
export function expandCircle() {
    const circles = document.querySelectorAll(".circle");
    if (circles.length === 0) 
        return;
    const randomCircle = circles[Math.floor(Math.random() * circles.length)];
            randomCircle.style.position = "fixed";
            randomCircle.style.left = randomCircle.offsetLeft + "px";
            randomCircle.style.top = randomCircle.offsetTop + "px";
            randomCircle.style.zIndex = 9999999;
            randomCircle.classList.add("expand");
            setTimeout(() => {
            randomCircle.classList.remove("expand");
            randomCircle.style.position = "absolute";
            randomCircle.style.zIndex = 9999;
    }, 1000);
}
export function DisplayMainPage(circlesContainer){
    let ProfilDiv = document.querySelectorAll(".profil");
    ProfilDiv.forEach(div => {
        div.remove();
    });
    ProfilDiv = new ElementCreator("div", "profil", "profil", circlesContainer);
    ProfilDiv.setHTML();
    ProfilDiv.setBack();
}  
function initRender() {
    const circlesContainer = document.getElementById("circles-container");
    const langButton = document.createElement("button");
    langButton.id = "langButton";
    langButton.className = "lang-switch";
    if (currentLanguage === "en"){
        langButton.textContent = "🇫🇷";
    }else{
        langButton.textContent = "🇬🇧";
    };
    circlesContainer.appendChild(langButton);
    
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

    
    DisplayMainPage(circlesContainer);

    langButton.addEventListener("click", () => {
        if(currentLanguage === "en"){
            langButton.textContent = "🇬🇧";
        }else{
            langButton.textContent = "🇫🇷";
        }
        switchCurrentLanguage();
        const actualDiv = document.querySelector(".profil");
        actualDiv._creator.setHTML();
        actualDiv._creator.setBack();
    });
}


