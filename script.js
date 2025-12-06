// ===========================================================================================
class objects {
  constructor(name, price, increasePrice, effect, type, img) {
    (this.name = name),
      this.price + price,
      (this.increasePrice = increasePrice),
      (this.effect = effect),
      (this.type = type),
      (this.img = img);
  }
}

const basket = new objects(
  "Basket",
  15,
  1.5,
  0.02,
  "auto",
  "./img/panier1.png"
);
const sickle = new objects("Sickle", 50, 1.7, 0.04, "auto", "./img/serpe.png");
const broom = new objects("Broom", 200, 2, 0.06, "auto", "./img/balais.png");
const boots = new objects("Boots", 800, 2.5, 2.5, "auto", "./img/bottes.png");
const hat = new objects("Hat", 5000, 1, "", "click", "./img/chapeau.png");
const caterpillars = new objects(
  "Caterpillars",
  4500,
  1.2,
  "",
  "click",
  "./img/chenille.png"
);
const fly = new objects("Fly", 4500, 1.4, "", "click", "./img/mouche.png");
const dragonFly = new objects(
  "Dragon fly",
  18500,
  1.6,
  "",
  "click",
  "./img/libellule.png"
);
const smallCloud = new objects(
  "Small cloud",
  25000,
  1.8,
  "",
  "click",
  "./img/petit_nuage.png"
);
const coat = new objects("Coat", 30000, 2, "", "click", "./img/manteaau.png");
const bag = new objects("Bag", 40000, 2, "", "click", "./img/sacoche.png");
const bell = new objects(
  "Bell",
  45000,
  2.4,
  "",
  "click",
  "./img/clochette.png"
);
const brush = new objects("Brush", 47000, 2.6, "", "click", "./img/brosse.png");
const cushion = new objects(
  "Cushion",
  50000,
  2.8,
  "",
  "click",
  "./img/coussin.png"
);
const ballOfYarn = new objects(
  "Ball of yarn",
  55000,
  3,
  "",
  "click",
  "./img/pelote de laine.png"
);
const claw = new objects("Claw", 65000, 4.2, "", "click", "./img/griffe.png");
const wand = new objects("Wand", 70000, 3, "", "click", "./img/baguette.png");
const necklace = new objects(
  "Necklace",
  85000,
  2.2,
  "",
  "2.2",
  "click",
  "./img/collier.png"
);
const scale = new objects(
  "Scale",
  85000,
  4.4,
  "",
  "click",
  "./img/ecaille.png"
);
const redFlame = new objects(
  "Red Flame",
  90000,
  4.6,
  "",
  "click",
  "./img/feu.png"
);
const medicine = new objects(
  "medicine",
  95000,
  4.8,
  "",
  "click",
  "./img/medoc.png"
);
const goldenEgg = new objects(
  "Golden Egg",
  95000,
  5,
  "",
  "click",
  "./img/egg.png"
);
const cat = new objects("Cat", 18000, 2, "", "auto", "./img/cat.png");
const dragon = new objects("Dragon", 100000, 4, "", "", "./img/dragon.png");
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
// let objects;
// async function fetchObject() {
//   const res = await fetch("http://localhost:3000/object");
//   const data = await res.json();
//   objects = data;
//   objects.forEach(shop);
// }
// fetchObject();
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
