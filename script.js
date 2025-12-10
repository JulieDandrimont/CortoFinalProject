// ==================================
// Variable Collection
const containerCollect = document.querySelector(".container-collection")
const btnCollec = document.querySelector(".collection")
// Variable for liquid
const liquid = document.querySelector(".liquid");
const counter = document.querySelector(".counter-boost");
let boostInterval = null; // its for stop of setInterval after boost
let isBoostActive = false; // if true active boost 
// Variable for display frog 
const containerPet = document.querySelector(".familiar")
const positionPets = document.querySelector(".pets")
const btnFrog = document.querySelector(".frog2")
const frog = document.querySelector(".frog1")
let displayFrog = false;
// ==================================

const btnClose = document.querySelector(".close")
const btnFlower = document.querySelector(".flower");
/// ================================== Variable =================================== ///
// DOM Elements
let shopItems = document.querySelector(".container-item-shop"); // récupère le conteneur des items de la boutique pour y ajouter les objets dynamiquement
let currentItems = document.querySelector(".container-current-attributs");
let collectItems = document.querySelector(".ul-collection")

let flowerCount = document.querySelector(".flower-count > h3 span");
let flowerCountCumul = document.querySelector(".flower-count > h3 ~ p span");

let spendableFlowers = parseFloat(flowerCount.textContent) || 0; // Récupère le nombre de fleurs disponibles pour l'achat
let intFlowerCountCumul = parseFloat(flowerCountCumul.textContent) || 0;

// Variables
let flowerPerClick = 1; // nombre de fleurs par clic de base
let totalAutoEffect = 0; // effet total des items automatiques
flowerCount.textContent = Math.round(spendableFlowers.toFixed(0));
flowerCountCumul.textContent = Math.round(intFlowerCountCumul.toFixed(0));

// ==================================
// Event on click collection
btnCollec.addEventListener("click", () => {
  containerCollect.style.display = "flex"
})
btnClose.addEventListener("click", () => {
  containerCollect.style.display = "none"
})
// ==================================

btnFlower.addEventListener("mousedown", () => {
  // crée une animation au clic sur la fleur
  btnFlower.style.transform = "scale(1.1)";
  spendableFlowers += flowerPerClick; // modifie le nombre de fleurs dépensables (var)
  intFlowerCountCumul += flowerPerClick;

  flowerCount.textContent = Math.round(spendableFlowers); // impplémente l'affichage du nombre de fleurs dépensables INNER HTML
  flowerCountCumul.textContent = Math.round(intFlowerCountCumul);
});
btnFlower.addEventListener("mouseup", () => {
  btnFlower.style.transform = "scale(1)";
});


/// ================================== CLASS ITEM SHOP =================================== ///
class items {
  static listItems = []
  constructor(
    name,
    current,
    price,
    increasePrice,
    effect,
    type,
    threshold,
    img,
    level = 0
  ) {
    this.name = name;
    this.current = current;
    this.price = price;
    this.increasePrice = increasePrice;
    this.effect = effect;
    this.type = type;
    this.threshold = threshold;
    this.img = img;
    this.level = level;
    this.li = null;
    this.containerLi = null;
    items.listItems.push(this);
  }
  // ==================================
  // HTML of the collection's components
  createItemCollection() {
    if (this.current == false) {
      this.containerLi = document.createElement("li")
      this.containerLi.className = "item-collection";
      this.containerLi.innerHTML = `
      <img src="${this.img}" alt="${this.name}"  />
      <div class="item-label">
      <h4>${this.name}</h4>
      </div>
      `;
    }
    collectItems.appendChild(this.containerLi)
  }
  // ==================================
  //HTML of the current's components
  createItemCurrent() {
    if (!this.containerLi) { // if différent to item-shop
      this.containerLi = document.createElement("li");
      this.containerLi.className = "item-current";
      this.containerLi.innerHTML = `
      <img src="${this.img}" class"item-current" alt=""  />
      <p>${this.name}</p>
      <p class="current-effect">${(this.effect * this.level).toFixed(2)}</p>
      <p class="current-level">${this.level}</p>
      `;
      currentItems.appendChild(this.containerLi)
    }
    else {
      //Permet de passer les valeurs pour le localStorage
      this.containerLi.querySelector(".current-level").textContent = this.level;
      this.containerLi.querySelector(".current-effect").textContent = (this.effect * this.level).toFixed(2);
    }
  }

  // ==================================
  // HTML of the shop's components
  createItem() {
    const li = document.createElement("li"); // the stock in a list of shop items
    li.className = "item-shop";
    this.li = li;
    this.li.innerHTML = `
    <img src="${this.img}" alt="${this.name}" class="img-shop" />
    <div class="item-label">
    <h3>${this.name}</h3>
    <p> <span class="item-price">${this.price}</span> F</p>
    </div>
    <button class="buy-btn">Buy</button>
    <div class="hover-stat-shop">
    <p> <span class="item-owned">${this.level}</span></p>
    <p>+<span class = "item-effect">${this.effect}</span></p>
    </div>
    `;

    const buyBtn = this.li.querySelector(".buy-btn"); //Retrieve the buy button
    buyBtn.addEventListener("click", () => {
      this.buy(); // Call the buyItem method when the purchase button is clicked.
    });
  }
  /// ================================== Clas Function Buy =================================== ///
  buy() {
    //pas besoin de paramètre car on utilise les propriétés de l'instance
    if (spendableFlowers >= this.price) {
      // Vérifie si le joueur a assez de fleurs
      spendableFlowers -= this.price; //enlève le prix des fleurs
      flowerCount.textContent = Math.round(spendableFlowers); // Met à jour l'affichage des fleurs collectées
      this.level++;
      if (this.type === "click") {
        flowerPerClick += this.effect; // Augmente les fleurs par clic
        // totalClickEffect += this.effect;
      } else if (this.type === "auto") {
        totalAutoEffect += this.effect;
      }
      this.price *= this.increasePrice; // Augmente le prix pour le prochain achat, à arrondir selon les besoins
      this.price = parseFloat(this.price.toFixed(2));
      // ici ajouter le cumul des effets de l'item à afficher dans le hover : ne pas oublier de L'in

      // FAIRE LA FONCTION D'AFFICHAGE
      //this.effect += parseFloat(this.effect); // APPARREMENT c'EST une erreur de logique ici, ça double l'effet à chaque achat, il faudrait peut-être juste laisser this.effect tel quel
      this.li.style.display = "flex"
      this.li.style.opacity = 1
      shopItems.appendChild(this.li)

      const priceSpan = this.li.querySelector(".item-price");
      priceSpan.innerHTML = this.price; // Met à jour le prix affiché
      const ownedSpan = this.li.querySelector(".item-owned");
      ownedSpan.innerHTML = this.level; // Met à jour la quantité possédée
      const effectSpan = this.li.querySelector(".item-effect");
      effectSpan.innerHTML = (this.effect * this.level).toFixed(2); // Met à jour l'effet affiché

      console.log(
        `Achat effectué : ${this.name}, nouvelle quantité possédée : ${this.level}`
      );
    } else {
      console.log(`Achat refusé : fonds insuffisants pour ${this.name}`);
      this.li.style.display = "none"
      this.li.style.opacity = 0.5
      return;
    }
    // ==================================
    // redirection of current items or not
    if (this.current == true) {
      this.createItemCurrent();
    } else {
      this.createItemCollection()
    }
    // ==================================
  }
}
/// ================================== CREATING ITEMS =================================== ///

const basket = new items("Basket", true, 15, 1.5, 0.2, "auto", 0, "./img/basket.png", 0);
basket.createItem();

const sickle = new items("Sickle", true, 50, 1.7, 0.4, "auto", 0, "./img/sickle.png", 0);
sickle.createItem();

const broom = new items("Broom", true, 200, 2, 0.6, "auto", 0, "./img/broom.png", 0);
broom.createItem();

const boots = new items("Boots", true, 800, 2.5, 0.8, "auto", 0, "./img/boots.png", 0);
boots.createItem();


const hat = new items("Hat", false, 5000, 1.2, 1, "click", 3000, "./img/hat.png", 0);
hat.createItem();

const coat = new items("Coat", false, 30000, 2, 6, "click", 15000, "./img/coat.png", 0);
coat.createItem();

const bag = new items("Bag", false, 40000, 2, 8, "click", 35000, "./img/bag.png", 0);
bag.createItem();

const wand = new items("Wand", false, 110000, 3, 40, "click", 80000, "./img/wand.png", 0);
wand.createItem();



const cat = new items("Cat", true, 18000, 2, 0.5, "auto", 17000, "./img/cat.png", 0);
cat.createItem();

const dragon = new items("Dragon", true, 100000, 4, 3, "auto", 80000, "./img/dragon.png", 0);
dragon.createItem();


const bell = new items("Bell", false, 45000, 2.4, 10, "click", 43000, "./img/bell.png", 0);
bell.createItem();

const brush = new items("Brush", false, 47000, 2.6, 12, "click", 45000, "./img/brush.png", 0);
brush.createItem();

const cushion = new items("Cushion", false, 50000, 2.8, 15, "click", 47000, "./img/cushion.png", 0);
cushion.createItem();

const ballOfYarn = new items("Ball of yarn", false, 55000, 3, 20, "click", 18000, "./img/ball_of_yarn.png", 0);
ballOfYarn.createItem();

const necklace = new items("Necklace", false, 85000, 2.2, 50, "click", 18000, "./img/necklace.png", 0);
necklace.createItem();



const claw = new items("Claw", false, 65000, 4.2, 30, "click", 100000, "./img/claw.png", 0);
claw.createItem();
const scale = new items("Scale", false, 85000, 4.4, 65, "click", 100000, "./img/scale.png", 0);
scale.createItem();

const redFlame = new items("Red Flame", false, 90000, 4.6, 80, "click", 100000, "./img/fire.png", 0);
redFlame.createItem();

const medicine = new items("medicine", false, 95000, 4.8, 100, "click", 100000, "./img/medicine.png", 0);
medicine.createItem();
const goldenEgg = new items("Golden Egg", false, 95000, 5, 150, "click", 100000, "./img/egg.png", 0);
goldenEgg.createItem();

// ==================================
// Function for display element in the shop
function displayshop() {
  // It checks the threshold and displays the result based on the available funds or the number of flowers collected.
  items.listItems.forEach((item) => {
    // If cumul and threshold
    if (intFlowerCountCumul < item.threshold) {
      item.li.style.display = "none"
      return // Prevents purchase
    }
    if (spendableFlowers < item.price) {
      item.li.style.opacity = 0.5
      item.li.style.display = "flex"
      shopItems.appendChild(item.li)
      return // Prevents purchase
    }

    // Style and Append child for create list items in the shop
    item.li.style.opacity = 1
    item.li.style.display = "flex"
    shopItems.appendChild(item.li)
  });
}

// ==================================
// Function for show animation liquid
// Function updates the liquid animation and start the boost at 2200
function updateLiquidAnimation() {
  liquid.style.transition = "0.3s ease-in-out";

  if (intFlowerCountCumul % 100 == 0) {
    liquid.style.height = "10px";
    liquid.style.transform = "translate(58%, -200%)";
  } else if (intFlowerCountCumul % 500 == 0) {
    liquid.style.height = "15px";
    liquid.style.transform = "translate(58%, -150%)";
  } else if (intFlowerCountCumul % 800 == 0) {
    liquid.style.height = "20px";
    liquid.style.transform = "translate(58%, -100%)";
  } else if (intFlowerCountCumul % 1300 == 0) {
    liquid.style.height = "30px";
    liquid.style.transform = "translate(58%, -80%)";
  } else if (intFlowerCountCumul % 1700 == 0 && !isBoostActivve) {
    liquid.style.height = "50px";
    liquid.style.transform = "translate(58%, -50%)";
    //if its diferente to false 
    activateBoost();
    // Launch the boost automatically if it's not already active.
  }
}

// ==================================
// Function to activate the 5-second boost
function activateBoost() {
  if (boostInterval !== null) {
    clearInterval(boostInterval)
    boostInterval = null
    isBoostActive = false
    counter.style.visibility = "visible"
  }
  isBoostActive = true; // GOOOOOOOO Boost 
  let baseFlowerPerClick = flowerPerClick; // switch value of click

  counter.textContent = 5;
  counter.style.visibility = "visible";
  flowerPerClick += 6; //Bonus: New flower value during the boost
  // In this countdown and stop loop
  boostInterval = setInterval(() => {
    counter.textContent--;
    if (counter.textContent <= 0) {
      clearInterval(boostInterval);
      counter.textContent = 0
      boostInterval = null;
      isBoostActive = false;
      counter.style.visibility = "hidden";
      flowerPerClick = baseFlowerPerClick; // Restaure la valeur normale
    }
  }, 1000);// this happens every second
}
if (counter.textContent = 0) clearInterval(boostInterval);


// ==================================
// Allows you to check if the frog display is active
const popFrog = () => {
  btnFrog.style.top = Math.random() * 90 + "%";
  btnFrog.style.left = Math.random() * 90 + "%";
  btnFrog.style.transition = "0.3s ease-in-out"
  // onclick you own +5 flowers and frog display in the game
  btnFrog.addEventListener("click", () => {
    btnFrog.remove()
    displayFrog = true
    btnFrog.style.display = "none"
    frog.style.visibility = "visible"
    positionPets.style.position = "relative"
    flowerPerClick += 5
  });
}

function loopFrog() {
  // As long as it's true, the frog is available with a click
  if (displayFrog == true) return
  if (intFlowerCountCumul >= 3000) { //threshold
    containerPet.style.opacity = 1;
    setInterval(popFrog, 1000);// Play animation
  }
}


// ==================================
// SetInterval 
setInterval(() => {
  spendableFlowers += totalAutoEffect;
  intFlowerCountCumul += totalAutoEffect;
  flowerCount.textContent = spendableFlowers.toFixed(2);
  flowerCountCumul.textContent = intFlowerCountCumul.toFixed(2);
  displayshop();
  updateLiquidAnimation();
  loopFrog();
}, 1000);
