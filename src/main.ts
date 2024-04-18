let partieFait = 0;
let nbCoups = 0;
let nb_remise = 0;
let time = 500;
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

const divChrono = document.createElement("div") as HTMLDivElement
divChrono.style.width = "20%"
divChrono.style.height = "240px"
divChrono.style.margin = "30px auto"
divChrono.style.border = "1px solid black"
divChrono.style.borderRadius = "800px";
divChrono.style.textAlign = "center"
divChrono.style.paddingTop= "110px"
const chrono = document.createElement("p") as HTMLParagraphElement
chrono.setAttribute("class","chrono_bottom");
let seconde = 0
let minute = 0
let secondes = `00`
let minutes = `00`
let intervalID = 0


function chronometre(){
    seconde++;

    if(seconde<10){
        secondes = `0` + seconde
    }
    if(seconde>10){
        secondes = seconde.toString()
    }

    if(seconde > 59){
        seconde = 0;
        minute++;
    
    }


    if(minute<10){
        minutes = `0` + minute
    }
    if(minute>10){
        minutes = minute.toString()
    }
    

    chrono.innerHTML = `Durée de la partie : ${minutes} : ${secondes}`;
}

function chronometerCall(){
    if (intervalID !== 0) {
        clearInterval(intervalID);  
    }
    intervalID = setInterval(chronometre, 1000); 
}

// Attention aux "as" qui règlent pas mal de soucis
const app = document.querySelector('#app') as HTMLDivElement;
const body = document.body
const head = document.querySelector("#col") as HTMLDivElement

// ANCHOR - Premier Button(commencer le jeu)
const btnStart = document.createElement('button') as HTMLButtonElement;
btnStart.innerText = "Commencer la partie";
btnStart.setAttribute("class","btn btn-success rounded-pill px-3");
btnStart.setAttribute("id","button_width");
btnStart.addEventListener("click", () => {
    chronometerCall() 
    seconde = 0
    minute = 0
    nbCoups = 0;
    init();
});

app.appendChild(btnStart);

// ANCHOR - Deuxieme Button(recommencer le jeu)
const btnReplay = document.createElement("button") as HTMLButtonElement
btnReplay.textContent = "Recommenceer la partie"
btnReplay.setAttribute("class","btn btn-warning rounded-pill px-3");
btnReplay.setAttribute("id","button_position");
btnReplay.addEventListener("click", ()=> {      
    partieFait+=1;
    init();
    seconde = 0
    minute = 0       
})

//ANCHOR - Troisième btn pour recommencer le jeu;
const remiseBtnStart = document.createElement("button") as HTMLButtonElement;
remiseBtnStart.textContent = "Récommencer le jeu";
remiseBtnStart.addEventListener("click", () => {
    nb_remise++;
    nbCoups = 0;
    init();
});

//ANCHOR - La div qui contient le jeu
const jeuDiv = document.createElement('div') as HTMLDivElement;
jeuDiv.setAttribute("id","jeuDiv");
jeuDiv.setAttribute("class", "argent");
jeuDiv.style.width = "450px";
jeuDiv.style.margin = "auto auto 30px auto";
jeuDiv.style.display = "flex";
jeuDiv.style.border = "1px solid black";
jeuDiv.style.flexWrap = "wrap";
jeuDiv.style.justifyContent = "space-between";

//ANCHOR - Victoire - La div qui apparait en remplaçant jeuDiv une fois le jeu terminé + fonction
const victoire = document.createElement("div") as HTMLDivElement
victoire.setAttribute("id", "victoire")
victoire.setAttribute("class", "argent")

function victoireFunc() {
    jeuDiv.remove()
    remiseBtnStart.remove()
    app.appendChild(victoire)
    victoire.innerHTML = `
        <h1>Bravo!</h1>
        <h2>Vous avez gagné</h2>
        <p>Vous avez fait ${nbCoups} coups pour gagner.</p>
        <p>Vous avez joué ${partieFait} fois.</p>   
        `
    app.appendChild(btnReplay);
}

// ANCHOR - Fonction qui réinitialise le jeu
function init(){
    btnStart.remove();
    
    app.innerHTML = `<p>Vous avez fait ${partieFait} partie(s)</p>`
    app.appendChild(jeuDiv);
    app.appendChild(btnReplay);
    app.appendChild(divChrono)
    divChrono.appendChild(chrono)
    // ANCHOR - Creation des carte avec des couleur
    const tiles = new Array(16).fill('').map((_, i) => {
        const tile = document.createElement("div");
        tile.setAttribute("class", "tile not-revealed");
        tile.setAttribute("color", colors[Math.floor(i / 2)]);
        tile.style.width = "50px";
        tile.style.height = "50px";
        tile.style.border = "1px solid black";
        tile.style.margin = "20px";
        tile.classList.add(colors[Math.floor(i / 2)]);
        return tile;
    });
    // Shuffle the tiles
    tiles.sort( () => Math.random() - 0.5);

    // Clear previous tiles in jeuDiv
    jeuDiv.innerHTML = '';

    // Add the tiles to the jeuDiv
    tiles.forEach( tile => jeuDiv.appendChild(tile));

    // On selection les tiles pour boucler dessus
    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);

    let carreChoisi:any = null;
    let propCol:any = null;
    let count = 0;

    // Ajout de l'ecouteur d'evenement click aux tiles
    elements.forEach( (element) => {
        element.addEventListener("click", () => {
            count++
            if(count%2 === 0){
                nbCoups++
            }
                                                            // C'est ici plus bas que ca bug je pense 
            if (element.classList.contains("not-revealed")) { // le bug est present parfois
                element.classList.remove("not-revealed"); // si je clique tres vite sur les carrés
                if (!carreChoisi) {                       //y en a trois carré qui reste retourné 
                    carreChoisi = element;                // je viens de penser que ç'arrive uniquement quand t'as deux meme couleurs qui sont tompe parmis les trois carrés, peut être c'est une coincidences 
                    propCol = carreChoisi.getAttribute("color")
                } else {
                    if(propCol === element.getAttribute("color") ) {
                        element.classList.add("revealed")
                        carreChoisi = null;
                        propCol = null;
                    } else {
                        setTimeout(() => {
                            carreChoisi.classList.add("not-revealed");
                            element.classList.add("not-revealed");
                            carreChoisi = null;
                            propCol = null;
                            
                        }, time);
                    }
                }
           
            }
            const win = elements.every(tile => !tile.classList.contains("not-revealed"));
            if (win) {
                
                if(time > 100){
                time-=25;
                }
                partieFait++;
                victoireFunc();
            } 
        });
        
    }); 

    
}


