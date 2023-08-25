let partieFait = 0;
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
//const butnStart = document.querySelector("#init-button") as HTMLButtonElement;
//const butnTile = document.querySelector(".tile") as HTMLButtonElement;
// Attention aux "as" qui règlent pas mal de soucis

const appli = document.querySelector('#app') as HTMLDivElement;
const body = document.body
const head = document.querySelector("#col") as HTMLDivElement


const butnStart = document.createElement('button') as HTMLButtonElement;
butnStart.innerText = "Commencer la partie";

appli.appendChild(butnStart);

const jeuDiv = document.createElement('div') as HTMLDivElement;
jeuDiv.setAttribute("id","jeuDiv");
jeuDiv.setAttribute("class", "argent");
jeuDiv.style.width = "450px";
jeuDiv.style.margin = "auto auto 30px auto";
jeuDiv.style.display = "flex";
jeuDiv.style.border = "1px solid black";
jeuDiv.style.flexWrap = "wrap";
jeuDiv.style.justifyContent = "space-between";

// Promises
fetch("https://dog.ceo/api/breeds/image/random")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
    document.querySelector("#image-chat")?.setAttribute("src", data.message);
})

const tiles = new Array(16).fill('').map( (_, i) => {
    const tile = document.createElement("div")
    tile.setAttribute("class", "tile")
    tile.style.width ="50px"
    tile.style.height = "50px"
    tile.style.margin = "25px 25px 25px 25px";
    tile.style.backgroundColor = colors[Math.floor(i/2)]
    return tile
})

// Shuffle the tiles
tiles.sort( () => Math.random() - 0.5)

// Add an event listener
butnStart.addEventListener("click", () => {
    init();
});

const btnReplay = document.createElement("button") as HTMLButtonElement
    btnReplay.textContent = "Recommenceer la partie"
    btnReplay.addEventListener("click", ()=> {      
        partieFait+=1;
        init();
        console.log("vous avez appuyé sur le bouton");
        
    })

function init(){
    console.log('init')
    butnStart.remove();
    
    appli.innerHTML = `<p>Vous avez fait ${partieFait} partie(s)</p>`
    appli.appendChild(btnReplay);
    appli.appendChild(jeuDiv);

    let couleur=colors;
    
    for(let j=0;j<tiles.length;j++) {
        if(tiles[j].style.backgroundColor == "white") {
            tiles[j].style.backgroundColor = couleur[j];
            console.log(couleur[j]);
            
        }
    }
// Add the tiles to the app
    tiles.forEach( tile => jeuDiv.appendChild(tile));

    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);
    elements.forEach( (element) => {

        element.setAttribute("class", "not-revealed")
        
        element.addEventListener("click", () => {
            element.setAttribute("class", "revealed");

            let index = getIndex(tiles);

            if (index!=-1) {
                couleur[index]=tiles[index].style.backgroundColor;
                tiles[index].style.backgroundColor = "white";
            }
        })

    })
    
}

function showColor(tiles:Array<HTMLDivElement>) {
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed") {
            appli.innerHTML = '<p>' + tiles[i].style.backgroundColor+'</p>';
        }
    }
}


function getColor(tiles:Array<HTMLDivElement>) {

    let clr = "";
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed") {
            clr = tiles[i].style.backgroundColor; 
        }
    }
    return clr;
}

function getColor2(tiles:Array<HTMLDivElement>) {

    let clr = "";
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed2") {
            clr = tiles[i].style.backgroundColor; 
        }
    }
    return clr;
}

function getIndex(tiles:Array<HTMLDivElement>) {
    ///    console.log('toto')
    let j = -1;
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed") {
            j=i; 
        }
    }
    return j;
    console.log(j);
    
}

function getIndex2(tiles:Array<HTMLDivElement>) {
    ///    console.log('toto')
    let j = -1;
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed2") {
            j=i; 
        }
    }
    return j;
}

