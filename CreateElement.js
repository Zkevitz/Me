import { expandCircle, DisplayMainPage } from "./render.js";

export let currentLanguage = "fr";

const projects42 = [
    { name: "WebServ", url: "https://github.com/Zkevitz/WebServ", language: "C++" },
    { name: "MiniShell", url: "https://github.com/Zkevitz/minishell", language: "C" },
    { name: "CPP", url: "https://github.com/Zkevitz/CPP", language: "C++" },
    { name: "CUB3D", url: "https://github.com/Zkevitz/CUB3D", language: "C" },
    { name: "So_long", url: "https://github.com/Zkevitz/So_long", language: "C" },
    { name: "ft_transcendence", url: "https://github.com/phlpn/Transcendence", language: "JavaScript/TypeScript" },
];
const projectsPersonnal = [
    { name: "Wakfu Damage Meter", url: "https://github.com/Zkevitz/Detail-s-Wakfu-Damage-Meter", language: "Python" },
    { name: "VintedScrapper", url: "https://github.com/Zkevitz/VintedScrapper", language: "Python" },
    { name: "DiscordBot", url: "https://github.com/Zkevitz/ChallFail_discord_bot", language: "Python" },
];

const TextPersonnalProjects = {
    en : {
        title : "Personnal Projects",
        MainText : "Here is a short list of my personnal projects"
    },
    fr : {
        title : "Personnal Projects",
        MainText : `Vous voici désormais du coté de mes projets personnels, au fil du temps
                 je me suis beaucoup pencher sur l'apprentisage du language Python et la creation de tache automatisé.
                 vous y retrouverez un scrapperWeb, un bot de gestion discord et un calculateur basé sur la lecture de fichiers log.`
    }
}
const WelcomeText = {
    en : {
        title : "Zkevitz (Matteo Gigot)",
        MainText : "Welcome to my portfolio, here you will find a collection of my projects and experiences."
    },
    fr : {
        title : "Zkevitz (Matteo Gigot)",
        MainText : "Bonjour voici mon portefolio sous forme d'un site web interactif dans lesquelles vous pourrez trouver mon parcours et mes projets."
    }
}
const ButtonText = {
    en : {
        back : "back",
    },
    fr : {
        back : "retour"
    }
}
const Text42Cursus = {
    en : {
        title : "42 Cursus",
        MainText : "My journey at 42 allowed me to dive deep into computer science through a hands-on, peer-learning approach. From low-level programming in C to full-stack projects, each challenge helped me grow as a developer and problem solver.",
        secondText : "Here is a short list of my projects that i've done during my 42 cursus"
    },
    fr : {
        title : "42 Cursus",
        MainText : `Mon parcours à 42 m’a permis d’explorer en profondeur l’informatique grâce à une approche 
                    pratique et basée sur l’entraide entre étudiants. Des projets en C bas niveau jusqu’au développement full-stack, 
                    chaque défi m’a aidé à progresser en tant que développeur et à renforcer mes capacités de résolution de problèmes.`,
        secondText : "Voici une courte liste des projets que j’ai réalisés au cours de mon cursus à 42."
    }
}
const GeneralText = {
    en : {
        clickAction : "Click on the project name to go to the github repository",
    },
    fr : {
        clickAction : "Cliquez sur le nom du projet pour accéder au dépôt GitHub.",
    }
}
const birthYear = 2001;
const age = new Date().getFullYear() - birthYear;
const AboutMeText = {
    en : {
        title : "About Me",
        MainText : `Since I was young, I have always been fascinated by technology and programming.
                    In April 2023, I started my curriculum at 42 and discovered the world of coding.
                    Since then, I haven’t stopped programming, whether for personal projects or as part of my studies.
                    I will complete the common core at 42 in July 2025.
                    You can find all my projects and the details of my journey on this website.`
    },
    fr : {
        title : "A propos de moi",
        MainText : `Depuis mon plus jeune âge, j’ai toujours été fasciné par la technologie et la programmation.
                    C’est en avril 2023 que j’ai commencé mon cursus à 42 et découvert le monde du code.
                    Depuis, je n’ai jamais arrêté de programmer, que ce soit pour mes projets personnels ou dans le cadre de mes études.
                    Je termine mon tronc commun à 42 en juillet 2025.
                    Vous pouvez retrouver sur ce site l’ensemble de mes projets et le détail de mon parcours.`,
    }
}
export class ElementCreator {
    constructor(tag, id, className, parent){
        this.element = document.createElement(tag);
        this.element.id = id;
        this.element.className = className;
        this.element.parent = parent;
        this.element._creator = this;
        parent.appendChild(this.element);
    }

    setHTML(){
        const generalText = GeneralText[currentLanguage]; 
        switch(this.element.id){
            case "profil":
                const text = WelcomeText[currentLanguage];
                this.element.innerHTML = `<h1>${text.title}</h1>
                <div class="description">
                <div class="JoliP">
                    <p class="align-center">
                    ${text.MainText}
                    </p>
                </div>
                </div>
                <div class="projects-container align-center">
                <button id="AboutMe" class="single-button">About Me</button>
                <button id="42" class="single-button">42 Cursus</button>
                <button id="PersonnalProjects" class="single-button">Personnal Projects</button>
                <a href="https://github.com/Zkevitz" target="_blank" id="github" class="single-button">GitHub</a>
                </div>`;
                break;
            case "42Div":
                const text1 = Text42Cursus[currentLanguage];
                this.element.innerHTML = `<h1>42 Cursus</h1>
                <button id="back" class="single-button single-button--top-right">Back</button>
                <div class="description">
                    <div class="JoliP">
                        <p class="align-center">
                            ${text1.MainText}
                        </p>
                    </div>
                    <p class="align-center">
                        ${text1.secondText}
                    </p>
                    <p class="align-center">
                        ${generalText.clickAction}
                    </p>
                </div>
                <div class="projects-container align-center"></div>`;

                const projectsContainer = this.element.querySelector(".projects-container");

                const grouped = projects42.reduce((acc, project) => {
                    if (!acc[project.language]) acc[project.language] = [];
                    acc[project.language].push(project);
                    return acc;
                }, {});
                for (const [language, projects] of Object.entries(grouped)) {
                    const section = document.createElement("section");
                    section.className = "project-category";

                    const title = document.createElement("h2");
                    title.textContent = language;
                    section.appendChild(title);

                    const grid = document.createElement("div");
                    grid.className = "project-grid";

                    projects.forEach(project => {
                        const btn = document.createElement("a");
                        btn.href = project.url;
                        btn.target = "_blank";
                        btn.className = "portfolio-button";
                        btn.textContent = project.name;
                        grid.appendChild(btn);
                    });

                    section.appendChild(grid);
                    projectsContainer.appendChild(section);
                }
                break;
            case "PersonnalProjects":
                const text2 = TextPersonnalProjects[currentLanguage];
                this.element.innerHTML = `<h1>Personnal Projects</h1>
                <button id="back" class="single-button single-button--top-right">Back</button>
                <div class="description">
                <div class="JoliP">
                    <p class="align-center">
                        ${text2.MainText}
                    </p>
                </div>
                    <p class="align-center">
                        ${generalText.clickAction}
                    </p>
                </div>
                <div class="projects-container align-center"></div>`;

                const projectsContainer2 = this.element.querySelector(".projects-container");
                const groupedPersonnal = projectsPersonnal.reduce((acc, project) => {
                    if (!acc[project.language]) acc[project.language] = [];
                    acc[project.language].push(project);
                    return acc;
                }, {});

                for (const [language, projects] of Object.entries(groupedPersonnal)) {
                    const section = document.createElement("section");
                    section.className = "project-category";

                    const title = document.createElement("h2");
                    title.textContent = language;
                    section.appendChild(title);

                    const grid = document.createElement("div");
                    grid.className = "project-grid";

                    projects.forEach(project => {
                        const btn = document.createElement("a");
                        btn.href = project.url;
                        btn.target = "_blank";
                        btn.className = "portfolio-button";
                        btn.textContent = project.name;
                        grid.appendChild(btn);
                    });

                    section.appendChild(grid);
                    projectsContainer2.appendChild(section);
                }
                break;
            case "AboutMe":
                const aboutMeText = AboutMeText[currentLanguage];
                this.element.innerHTML = `<h1>About Me</h1>
                <button id="back" class="single-button single-button--top-right">Back</button>
                <div class="description">
                    <p class="align-center">
                        Name : Matteo Gigot
                    </p>
                    <p class="align-center">
                        Age : ${age} ans
                    </p>
                    <p class="align-center">
                        Location : Brussels, Belgium
                    </p>
                    <p class="align-center">
                        Language Stack : Python, C, JavaScript/TypeScript, C++, HTML/CSS
                    </p>
                    <p class="align-center">
                        Tech Stack : Git, GitHub, Makefile, Docker 
                    </p>
                    <div class="JoliP">
                        <p class="align-center">
                            ${aboutMeText.MainText}
                        </p>
                    </div>
                </div>`;
                break;
            default:
                this.element.innerHTML = html;
                break;
        }
    }

    setBack(){
        switch(this.element.id){
            case "profil":
                const button42 = document.getElementById("42");
                if(button42){
                    const circlesContainer = document.getElementById("circles-container");
                    button42.addEventListener("click", () => {
                        expandCircle();
                        setTimeout(() => {
                            const ProfilDiv = document.getElementById("profil");
                            if(ProfilDiv){
                                ProfilDiv.remove();
                                const div42 = new ElementCreator("div", "42Div", "profil", circlesContainer);
                                div42.setHTML();
                                div42.setBack();
                            }
                        }, 1000);
                    });
                }
                const buttonPersonnalProjects = document.getElementById("PersonnalProjects");
                if(buttonPersonnalProjects){
                    const circlesContainer = document.getElementById("circles-container");
                    buttonPersonnalProjects.addEventListener("click", () => {
                        expandCircle();
                        setTimeout(() => {
                            const ProfilDiv = document.getElementById("profil");
                            if(ProfilDiv){
                                ProfilDiv.remove();
                                const divPersonnalProjects = new ElementCreator("div", "PersonnalProjects", "profil", circlesContainer);
                                divPersonnalProjects.setHTML();
                                divPersonnalProjects.setBack();
                            }
                        }, 1000);
                    });
                }
                const buttonAboutMe = document.getElementById("AboutMe");
                if(buttonAboutMe){
                    const circlesContainer = document.getElementById("circles-container");
                    buttonAboutMe.addEventListener("click", () => {
                        expandCircle();
                        setTimeout(() => {
                            const ProfilDiv = document.getElementById("profil");
                            if(ProfilDiv){
                                ProfilDiv.remove();
                                const divAboutMe = new ElementCreator("div", "AboutMe", "profil", circlesContainer);
                                divAboutMe.setHTML();
                                divAboutMe.setBack();
                            }
                        }, 1000);
                    });
                }
                break;
            case "42Div":
                const back = document.getElementById("back");
                back.addEventListener("click", () => {
                    expandCircle();
                    setTimeout(() => {
                        this.element.remove();
                        DisplayMainPage(this.element.parent);
                    }, 1000);
                });
                break;
            default:
                const back2 = document.getElementById("back");
                back2.addEventListener("click", () => {
                    expandCircle();
                    setTimeout(() => {
                        this.element.remove();
                        DisplayMainPage(this.element.parent);
                    }, 1000);
                });
                break;
        }
    }

}

export function switchCurrentLanguage(){
    if(currentLanguage === "en"){
        currentLanguage = "fr";
    }else{
        currentLanguage = "en";
    }
}