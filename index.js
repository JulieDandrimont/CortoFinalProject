const counter = document.querySelector(".counter");
//Initialisation des variables
let flowerFragment = 0;
let flower = 0;
counter.innerHTML = 0;
// setInterval(() => {
//   // Permet de créer une boucle pour automatiser le génération de fleur.
//   flowerFragment += 0.02; // Fragment de fleur par seconde
//   console.log("Fragment de fleur", flowerFragment);
//   if (flowerFragment >= 1) {
//     //si fragment est supérieur à 1
//     counter.innerHTML = flower++; // compteur prend 1 fleur
//     flowerFragment = 0; //remise à zero de fragment
//     console.log("Fragment de fleur", flowerFragment, "Compteur", counter);
//   }
// }, 1000); //Toutes les secondes.
// Event au click ajoute 1 fleur
// btnFlower.addEventListener("click", () => {
//   counter.innerHTML = flower++;
// });
// ===============================================================
//variable pour la frog
const btnFrog = document.getElementById("frog"); //Button frog
const counterFrog = document.querySelector(".counterFrog"); //number frog
const buyFrog = document.querySelector(".buyFrog"); //number frog
const priceFrog = document.querySelector(".priceFrog"); //priceFrog

let fristPriceFrog = 15;
let frog = 1;
counterFrog.innerHTML = 0; // affiche zero
priceFrog.innerHTML = fristPriceFrog; // affiche le prix

//Event au click
btnFrog.addEventListener("click", () => {
  counterFrog.innerHTML = frog++; // 1clic 1 frog
  console.log(counterFrog.innerHTML);
});
// ????????????????????????????????????????????????
buyFrog.addEventListener("click", () => {
  fristPriceFrog = fristPriceFrog * 1.5; // multiplie le prix
  priceFrog.innerHTML = Math.floor(fristPriceFrog); // affiche le prix multiplié Math.floor(retire les chiffres après virgule)
  console.log(fristPriceFrog, priceFrog.innerHTML);
});

const btnFlower = document.getElementById("btn-flower");
btnFlower.addEventListener("click", () => {
  flowersTotal += 1;
  console.log(flowersTotal);
});

// Aller chercher les infos dans le dictionnaire.
fetch("http://localhost:3000/object")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
// =======================================
// Récupération des classes-css des familiers
const containerItemsFrog = document.querySelector(".container-items-frog");
const containerItemsCat = document.querySelector(".container-items-cat");
const containerItemsDragon = document.querySelector(".container-items-dragon");
// Permet d'aller chercher les stats de chaque
fetch("http://localhost:3000/pet")
  .then((res) => res.json())
  .then((data) => {
    // Variables pour accéder aux objets par familier
    let objectFrog = data[0].object;
    let objectCat = data[1].object;
    let objectDragon = data[2].object;

    for (let i = 0; i < objectFrog.length; i++) {
      containerItemsFrog.innerHTML += `
      <li class="items-frog">${objectFrog[i][0]}
      <span class="hover-items-frog">
      Avec ${objectFrog[i][0]} vous obtenez ${objectFrog[i][1]} de plus !!
      </span>
      </li>
      `;
    }
    for (let i = 0; i < objectCat.length; i++) {
      containerItemsCat.innerHTML += `
      <li class="items-frog">${objectCat[i][0]}
      <span class="hover-items-frog">
      Avec ${objectCat[i][0]} vous obtenez ${objectCat[i][1]} de plus !!
      </span>
      </li>
      `;
    }
    for (let i = 0; i < objectFrog.length; i++) {
      containerItemsDragon.innerHTML += `
      <li class="items-frog">${objectDragon[i][0]}
      <span class="hover-items-frog">
      Avec ${objectDragon[i][0]} vous obtenez ${objectDragon[i][1]} de plus !!
      </span>
      </li>
      `;
    }
  });
