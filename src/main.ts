let compt = 0;
let partieFait = 0;
const colores = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
//const butnStart = document.querySelector("#init-button") as HTMLButtonElement;
//const butnTile = document.querySelector(".tile") as HTMLButtonElement;
// Attention aux "as" qui règlent pas mal de soucis

let cptRemise = 0;

const appli = document.querySelector('#app') as HTMLDivElement;
const body = document.body
const head = document.querySelector("#col") as HTMLDivElement


const butnStart = document.createElement('button') as HTMLButtonElement;
butnStart.innerText = "Commencer la partie";
//(typeof butnStart.textContent("Commencer la partie")==='string') && butnStart.textContent("Commencer la partie");
//butnStart.addEventListener("click", () => {
    //initi();
//});
appli.appendChild(butnStart);

const butnRemise = document.createElement("button") as HTMLButtonElement;

butnRemise.innerText = "recommencer le jeu";
butnRemise.addEventListener("click", () => {
    compt=0;
    cptRemise++;
    initi();
})



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



// Add an event listener
//butnStart.addEventListener("click", () => {
//    initi();
//});


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
        partieFait+=1;
        initi();
        console.log("vous avez appuyé sur le bouton");
        
    })

function initi(){
    console.log('init')
    butnStart.remove();
    
    appli.innerHTML = `<p>Vous avez fait ${partieFait} partie(s)</p>`
    appli.appendChild(btnReplay);
    appli.appendChild(jeuDiv);
   
    compt++;
    let color1 = "1";
    let color2 = "2";
    let couleur=colores;
    appli.appendChild(jeuDiv);
    appli.appendChild(butnRemise);

    console.log("click1");
    
    for(let j=0;j<tiles.length;j++) {
        if(tiles[j].style.backgroundColor == "white") {
            tiles[j].style.backgroundColor = couleur[j];
            console.log(couleur[j]);
            
        }
    }

    tiles.forEach( tile => jeuDiv.appendChild(tile));

    // Add the tiles to the app
    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);
    elements.forEach( (element) => {
        //let i = 0;
        element.setAttribute("class", "not-revealed")
        
        element.addEventListener("click", () => {
            element.setAttribute("class", "revealed");
            //color1 = getColor(tiles);
            let index = getIndex(tiles);
            //appli.innerHTML = '<p>' + color1+'</p>'
            if (index!=-1) {
                couleur[index]=tiles[index].style.backgroundColor;
                tiles[index].style.backgroundColor = "white";
            }
        })

    })
    
}
    //appli.innerHTML = `
    //    <p>${cpt}</p>
    //    <button id="init-button">Nouveau Click</button>
    //`;
    //appli.innerHTML = '
    //    <div id = "disp">
    //';

//    tiles.forEach( tile => jeuDiv.appendChild(tile));
   
    
    // Add the tiles to the app
//    let nodeList = document.querySelectorAll(".tile");
//    let elements = Array.from(nodeList);
//    elements.forEach( (element) => {
        //let i = 0;
//        element.setAttribute("class", "not-revealed")
//        element.addEventListener("click", () => {
//            element.setAttribute("class", "revealed");
//            color1 = getColor(tiles);
//            let index = getIndex(tiles);
            //appli.innerHTML = '<p>' + color1+'</p>'
//            if (index!=-1) {
//                tiles[index].style.backgroundColor = "white";
//            }
//        })
            ///showColor(tiles);
            


            ///tiles.forEach( tile => appli.appendChild(tile));

            ///let nodeList2 = document.querySelectorAll(".tile");
            ///let elements2 = Array.from(nodeList2);
            ///elements2.forEach( (element2) => {
                //let i = 0;
                ///element2.setAttribute("class", "not-revealed2")
                ///element2.addEventListener("click", () => {
                    ///element2.setAttribute("class", "revealed2");
                    ////showColor(tiles);
                    ///color2 = getColor2(tiles);
                    ///let index2 = getIndex2(tiles);
                    ///if (color1==color2) {
                        ///appli.innerHTML = '<p>les deux couleurs sont identiques</p>'
                    ///}
                    ///else {
                        ///appli.innerHTML = '<p>les deux couleurs ne sont pas identiques</p>'
                    ///}
                ///})
            ///})

        //)
        
        //i++;
        //element.addEventListener("click", () => {
            //element.setAttribute("class", "revealed")
        //})
    ///})


    
    
    
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
//}

//function card() {
//    appli.innerHTML = '<p>tata</p>';
//}

///function showColor(til:HTMLDivElement) {
///    console.log('toto')
///    appli.innerHTML = '<p>' + til.style.backgroundColor+'</p>';
///}

function showColor(tiles:Array<HTMLDivElement>) {
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed") {
            appli.innerHTML = '<p>' + tiles[i].style.backgroundColor+'</p>';
        }
    }
}

//function getColor(til:HTMLDivElement) {
    ///    console.log('toto')
    //return til.style.backgroundColor;
//}

function getColor(tiles:Array<HTMLDivElement>) {
    ///    console.log('toto')
    let clr = "";
    for (let i=0;i<tiles.length;i++) {
        if (tiles[i].className=="revealed") {
            clr = tiles[i].style.backgroundColor; 
        }
    }
    return clr;
}

function getColor2(tiles:Array<HTMLDivElement>) {
    ///    console.log('toto')
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

