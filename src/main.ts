let compt = 0;
let partieFait = 0;
const colores = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
const butnStart = document.querySelector("#init-button") as HTMLButtonElement;
//const butnTile = document.querySelector(".tile") as HTMLButtonElement;
// Attention aux "as" qui règlent pas mal de soucis
const appli = document.querySelector('#app') as HTMLDivElement;
const body = document.body
const head = document.querySelector("#col") as HTMLDivElement
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
    tile.style.backgroundColor = colores[Math.floor(i/2)]
    return tile
})

    // Shuffle the tiles
    tiles.sort( () => Math.random() - 0.5)

    // Add the tiles to the app
    //tiles.forEach( tile => appli.appendChild(tile))



// Add an event listener
butnStart.addEventListener("click", () => {
    initi();
});

const btnReplay = document.createElement("button") as HTMLButtonElement
    btnReplay.textContent = "Recommenceer la partie"
    btnReplay.addEventListener("click", ()=> {      
        partieFait+=1
        initi()
    })

function initi(){
    console.log('init')
    butnStart.remove();
    body.appendChild(btnReplay);
    
    appli.innerHTML = `<p>Vous avez fait ${partieFait} partie(s)</p>`
    appli.appendChild(jeuDiv);
   
    compt++;
    //appli.innerHTML = `
    //    <p>${cpt}</p>
    //    <button id="init-button">Nouveau Click</button>
    //`;
    //appli.innerHTML = '
    //    <div id = "disp">
    //';
    tiles.forEach( tile => jeuDiv.appendChild(tile));
   
    
    // Add the tiles to the app
    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);
    elements.forEach( (element) => {
        let i = 0;
        element.setAttribute("class", "not-revvealed")
        element.addEventListener("click", () => {
            element.setAttribute("class", "revealed");
            showColor(tiles[i]);
        })
        i++;
        //element.addEventListener("click", () => {
            //element.setAttribute("class", "revealed")
        //})
    })
    
    //tiles.forEach( tile => tile.addEventListener("click", () => {
//        tiles.forEach( element => element.addEventListener("click", () => {
        //const selectTile = document.querySelectorAll(".tile") as HTMLElement;
   //     const selectTile = document.querySelectorAll(".tile") as HTMLDivElement;
        //const colorTile = document.querySelector(".tile") as HTMLElement;
        //const colorTile = tiles[i] as HTMLElement;
//        card(element);
//    }));
    //let i : number;
    //const butnTile=[];
//    for (i=0;i<tiles.length;i++) {
        //const butnTile = document.querySelector(".tile") as HTMLButtonElement;
//        butnTile[i] = document.querySelector(".tile") as HTMLButtonElement;
//        console.log("gagne");
        
//        butnTile[i].addEventListener("click", () => {
//            console.log("gagne!");
//            card(i);
//        });
//    };
}

//function card() {
//    appli.innerHTML = '<p>tata</p>';
//}

function showColor(til:HTMLDivElement) {
    console.log('toto')
    appli.innerHTML = '<p>' + til.style.backgroundColor+'</p>';
}

