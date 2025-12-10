// ===========================================================================================
// Déclaration des variables
const shopItems = document.querySelector(".container-item-shop");
const currentItems = document.querySelector(".container-current-attributs");
const btnFlower = document.querySelector(".flower");
const flowerCount = document.querySelector(".flower-count > p span");
const flowerCountCumul = document.querySelector(".flower-count > p ~ p span");

// ===========================================================================================
// Event Collection et variable :
const itemCollection = document.querySelector(".ul-collection");
const btnCollection = document.querySelector(".collection");
const containerCollection = document.querySelector(".container-collection");
const btnClose = document.querySelector(".close");

btnCollection.addEventListener("click", () => {
  containerCollection.style.display = "flex";
  containerCollection.style.transform = "transition: 0.8s ease-in-out;";
});
btnClose.addEventListener("click", () => {
  containerCollection.style.display = "none";
});

// ===========================================================================================
// Utilisation du Fetch pour aller chercher les objets dans le fichier Json
// J'utilise le fecth pour aller chercher les informations dans notre data.json, mais il est
// asynchrone de base, j'utilise async/await pour attendre les données de l'API avant de continuer
// Cela garantit que "objects" est rempli avant d'appeler shop() ou clickBuy().
let objects;
async function fetchObject() {
  const res = await fetch("http://localhost:3000/object");
  const data = await res.json();
  objects = data;
  objects.forEach(shop);
}
fetchObject();
// ===========================================================================================
// Event sur la fleur centrale
btnFlower.addEventListener("mousedown", () => {
  btnFlower.style.transform = "scale(1.1)";
  flowerCount.innerHTML++;
  flowerCountCumul.innerHTML++;
});

btnFlower.addEventListener("mouseup", () => {
  btnFlower.style.transform = "scale(1)";
});

// ===========================================================================================
// Function Event Click Buy items plus redirection affichage items current et non current
function shop(obj) {
  // inférieur a 3000F
  if (
    obj.price >= 0 &&
    obj.price <= 3000 &&
    flowerCountCumul.textContent <= 3000
  ) {
    // Suppérieur à 3000F et inférieur à 18000F
  } else if (
    obj.price >= 3000 &&
    obj.price <= 18000 &&
    flowerCountCumul.textContent >= 3000
  ) {
    // Suppérieur à 3000F et inférieur à 18000F
  } else if (
    obj.price > 18000 &&
    obj.price < 30000 &&
    flowerCountCumul.textContent >= 18000
  ) {
    // Suppérieur à 3000F et inférieur à 18000F
  } else if (
    obj.price > 30000 &&
    obj.price < 50000 &&
    flowerCountCumul.textContent >= 30000
  ) {
    // Suppérieur à 3000F et inférieur à 18000F
  } else if (
    obj.price > 50000 &&
    obj.price < 80000 &&
    flowerCountCumul.textContent >= 50000
  ) {
    // Suppérieur à 3000F et inférieur à 18000F
  } else if (obj.price > 80000 && flowerCountCumul.textContent >= 80000) {
  }
}
