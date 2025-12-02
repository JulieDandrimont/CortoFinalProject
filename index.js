const btnFlower = document.getElementById("btn-flower");
const counter = document.querySelector(".counter");
//Initialisation des variables
let flowerFragment = 0;
let flowersCountCumul = 0;
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
btnFlower.addEventListener("click", () => {
  counter.innerHTML = flower++;
});
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

buyFrog.addEventListener("click", () => {
  fristPriceFrog = fristPriceFrog * 1.5; // multiplie le prix
  priceFrog.innerHTML = Math.floor(fristPriceFrog); // affiche le prix multiplié Math.floor(retire les chiffres après virgule)
  console.log(fristPriceFrog, priceFrog.innerHTML);
});

// const btnFlower = document.getElementById("btn-flower");
// btnFlower.addEventListener("click", () => {
//   flowersTotal += 1;
//   console.log(flowersTotal);
// });

// const r = Math.floor(Math.random(0) * 250);
// const g = Math.floor(Math.random(0) * 250);
// const b = Math.floor(Math.random(0) * 250);

// console.log(r, g, b);

// Aller chercher les infos dans le dictionnaire.
fetch("http://localhost:3000/object")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
  });
fetch("http://localhost:3000/pet")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
  });
