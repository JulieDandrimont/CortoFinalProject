// ==================================
// Variable Collection
const containerCollect = document.querySelector(".container-collection")
const btnCollec = document.querySelector(".btn-collection")
// Variable for liquid
const liquid = document.querySelector(".liquid");
const counter = document.querySelector(".counter-boost");
let boostInterval = null; // its for stop of setInterval after boost
let isBoostActive = false; // if true active boost 
// Variable for display frog 
const containerPet = document.querySelector(".container-pet")
const positionPets = document.querySelector(".pet")
const btnFrog = document.querySelector(".frog2")
const frog = document.querySelector(".frog1")
const statFrog = document.querySelector(".stat-frog")
// ==================================

const btnClose = document.querySelector(".close")
const btnFlower = document.querySelector(".flower");
/// ================================== Variable =================================== ///
// DOM Elements
let shopItems = document.querySelector(".container-item-shop"); // get shop container to add dynamically JS
let currentItems = document.querySelector(".container-current-attributs");
let collectItems = document.querySelector(".ul-collection")

let flowerCount = document.querySelector(".flower-count > h2 span");
let flowerCountCumul = document.querySelector(".flower-count p > span");
console.log(flowerCountCumul);


let spendableFlowers = parseFloat(flowerCount.textContent) || 0; 
let intFlowerCountCumul = parseFloat(flowerCountCumul.textContent) || 0;

// Variables
let flowerPerClick = 1; // nombre de fleurs par clic de base
let totalAutoEffect = 0; // effet total des items automatiques
flowerCount.textContent = Math.round(spendableFlowers.toFixed(0));
flowerCountCumul.textContent = Math.round(intFlowerCountCumul.toFixed(0));

let displayFrog = false;
let frogListenerAdded = false;

//localStorage.clear(); // for the debug

/// ==== GAME DATA
const itemsData = [
  ["Basket", true,15, 1.3, 0.2, "auto", 0, "./img/basket.png", 0],
  ["Sickle", true,50, 1.5, 0.4, "auto", 0, "./img/sickle.png", 0],
  ["Broom",true, 200, 1.7, 0.6, "auto", 0, "./img/broom.png", 0],
  ["Boots",true, 800, 2, 0.8, "auto", 0, "./img/boots.png", 0],
  ["Hat",false, 5000, 1.2, 1, "auto", 3000, "./img/hat.png", 0],
  ["Coat",false, 30000, 2, 6, "click", 15000, "./img/coat.png", 0],
  ["Bag",false, 40000, 2, 8, "click", 35000, "./img/bag.png", 0],
  ["Wand",false, 110000, 3, 40, "click", 80000, "./img/wand.png", 0],
  ["Bell",false, 45000, 2.4, 10, "click", 43000, "./img/bell.png", 0],
  ["Brush",false, 47000, 2.6, 12, "click", 45000, "./img/brush.png", 0],
  ["Cushion",false, 50000, 2.8, 15, "click", 47000, "./img/cushion.png", 0],
  ["Ball of yarn",false, 55000, 3, 20, "click", 18000, "./img/ball_of_yarn.png", 0],
  ["Necklace", false,85000, 2.2, 50, "click", 18000, "./img/necklace.png", 0],
  ["Claw", false,65000, 4.2, 30, "click", 100000, "./img/claw.png", 0],
  ["Scale",false, 85000, 4.4, 65, "click", 100000, "./img/scale.png", 0],
  ["Red Flame",false, 90000, 4.6, 80, "click", 100000, "./img/fire.png", 0],
  ["Medicine",false, 95000, 4.8, 100, "click", 100000, "./img/medicine.png", 0],
  ["Golden Egg",false, 95000, 5, 150, "click", 100000, "./img/egg.png", 0]];

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
  constructor(name,current,price,increasePrice,effect,type,threshold,img,level = 0
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
        <div class="stat-shop">
          <p> <span class="item-price">${this.price}</span> F</p>
          <p>+<span class = "item-effect">${this.effect}</span></p>
        </div>
      </div>
    <button class="buy-btn">Buy</button>
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
      // const ownedSpan = this.li.querySelector(".item-owned");
      // ownedSpan.innerHTML = this.level; // Met à jour la quantité possédée
      const effectSpan = this.li.querySelector(".item-effect");
      effectSpan.innerHTML = (this.effect).toFixed(2); 

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

// ==================================
// Function for display element in the shop
function displayshop() {
  // It checks the threshold and displays the result based on the available funds or the number of flowers collected.
  items.listItems.forEach((item) => {
    // normal item disapear 
    if (item.current === false && item.level >= 1) {
      item.li.style.display = "none";
      return;
    } // Don't display if its in collection   
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

/// ===== load game function
function loadGame() {

  items.listItems = [] 
  
  shopItems.innerHTML = "" // évite les doublons

  const saved = JSON.parse(localStorage.getItem("itemsList")||"[]");

    if (saved.length === 0) { // tu commences un nouveau jeu
        console.log("Aucune sauvegarde trouvée — création des items par défaut.");

        itemsData.forEach(stat => {
          new items(...stat).createItem();}); // charge les stats 

        // conditions de base

        flowerCount.textContent = 0;
        flowerCountCumul.textContent = 0;
        spendableFlowers = parseFloat(localStorage.getItem("flowerCount"))||spendableFlowers;
        intFlowerCountCumul = parseFloat(localStorage.getItem("flowerCountCumul"))||intFlowerCountCumul;
        flowerPerClick = parseFloat(localStorage.getItem("clickerValue"))||1;
        totalAutoEffect = parseFloat(localStorage.getItem("effect"))||0;
        
        console.log("Sauvegarde trouvée — chargement...");

    } else { 

      // Sinon, si le localStorage contient des data, on les charge

    // Recrée les instances

    saved.forEach(obj => {
      
      const createClass = new items(
            obj.name,
            obj.current,
            parseFloat(obj.price),
            parseFloat(obj.increasePrice),
            parseFloat(obj.effect),
            obj.type,
            parseFloat(obj.threshold),
            obj.img,
            parseInt(obj.level));

            createClass.createItem()
        });

      
    // affiche le HTML 



    // Charge les autres valeurs A DEBUG
    spendableFlowers = parseFloat(localStorage.getItem("flowerCount")) || 0;
    intFlowerCountCumul = parseFloat(localStorage.getItem("flowerCountCumul")) || 0;
    totalAutoEffect = parseFloat(localStorage.getItem("effects")) || 0;
    flowerPerClick = parseFloat(localStorage.getItem("clickerValue")) || 1;

    //console.log("Items chargés :", items.listItems); 

    flowerCount.textContent = parseFloat(spendableFlowers.toFixed(2));
    flowerCountCumul.textContent = parseFloat(intFlowerCountCumul.toFixed(2));
    console.log("jeu chargé")
}}

// ==================================
//  Area for improvement: aiming to give a boost
// Function for show animation liquid
// Function updates the liquid animation and start the boost at 2200
// function updateLiquidAnimation() {
//   liquid.style.transition = "0.3s ease-in-out";

//   if (intFlowerCountCumul % 100 == 0) {
//     liquid.style.height = "10px";
//     liquid.style.transform = "translate(0%, -430%)";
//   } else if (intFlowerCountCumul % 500 == 0) {
//     liquid.style.height = "15px";
//     liquid.style.transform = "translate(0%, -150%)";
//   } else if (intFlowerCountCumul % 800 == 0) {
//     liquid.style.height = "20px";
//     liquid.style.transform = "translate(0%, -100%)";
//   } else if (intFlowerCountCumul % 1300 == 0) {
//     liquid.style.height = "30px";
//     liquid.style.transform = "translate(0%, -80%)";
//   } else if (intFlowerCountCumul % 1700 == 0 && !isBoostActivve) {
//     liquid.style.height = "50px";
//     liquid.style.transform = "translate(0%, -50%)";
//     //if its diferente to false 
//     activateBoost();
//     // Launch the boost automatically if it's not already active.
//   }
// }

// // Function to activate the 5-second boost
// function activateBoost() {
//   if (boostInterval !== null) {
//     clearInterval(boostInterval)
//     boostInterval = null
//     isBoostActive = false
//     counter.style.visibility = "visible"
//   }
//   isBoostActive = true; // GOOOOOOOO Boost 
//   let baseFlowerPerClick = flowerPerClick; // switch value of click

//   counter.textContent = 5;
//   counter.style.visibility = "visible";
//   flowerPerClick += 6; //Bonus: New flower value during the boost
//   // In this countdown and stop loop
//   boostInterval = setInterval(() => {
//     counter.textContent--;
//     if (counter.textContent <= 0) {
//       clearInterval(boostInterval);
//       counter.textContent = 0
//       boostInterval = null;
//       isBoostActive = false;
//       counter.style.visibility = "hidden";
//       flowerPerClick = baseFlowerPerClick; // Restaure la valeur normale
//     }
//   }, 1000);// this happens every second
// }
// if (counter.textContent = 0) clearInterval(boostInterval);


// // ==================================
// // Allows you to check if the frog display is activ
// function popFrog() {
//   btnFrog.style.displau = "block"
//   // if (displayFrog == true) return
//   if (intFlowerCountCumul >= 3000) { //threshold
//     containerPet.style.opacity = 1;
//     btnFrog.style.top = Math.random() * 90 + "%";
//     btnFrog.style.left = Math.random() * 90 + "%";
//     btnFrog.style.transition = "1s ease-in-out"
//     // onclick you own + 5 flowers and frog display in the game
//     btnFrog.addEventListener("click", () => {
//       btnFrog.remove()
//       displayFrog = true
//       btnFrog.style.display = "none"
//       statFrog.style.visibility = "visible"
//       frog.style.visibility = "visible"
//       positionPets.style.position = "relative"
//       flowerPerClick += 5
//     });
//   }
// }
// ==================================
// ==================================
// Allows you to check if the frog display is active
function popFrog() {
  // Seulement si le seuil est atteint et que le display n'est pas déjà actif
  if (displayFrog == true) return;

  if (intFlowerCountCumul >= 3000) { //threshold
    containerPet.style.opacity = 1;
    btnFrog.style.display = "block"; // Corrigé: "displau" -> "display"
    btnFrog.style.top = Math.random() * 90 + "%";
    btnFrog.style.left = Math.random() * 90 + "%";
    btnFrog.style.transition = "1s ease-in-out";

    // Ajoute l'event listener une seule fois
    if (!frogListenerAdded) {
      frogListenerAdded = true;
      btnFrog.addEventListener("click", () => {
        displayFrog = true;
        btnFrog.style.display = "none";
        statFrog.style.visibility = "visible";
        frog.style.visibility = "visible";
        positionPets.style.position = "relative";
        flowerPerClick += 5;
      });
    }
  }
}

/// ================================== SAVE GAME =================================== ///

function saveGame(){ // QUAND ON QUITTE OU RECHARGE LA PAGE, ÇA SAVE 

  const prepSave = items.listItems.map(row => ({
    name : row.name,
    current : row.current,
    price : row.price,
    increasePrice : row.increasePrice,
    effect : row.effect,
    type : row.type,
    threshold : row.threshold,
    img : row.img,
    level : row.level
  }));

  // on sauvegarde la liste des instances
  localStorage.setItem("itemsList", JSON.stringify(prepSave));

  localStorage.setItem("flowerCount", spendableFlowers);
  localStorage.setItem("flowerCountCumul",intFlowerCountCumul)
  localStorage.setItem("clickerValue", flowerPerClick);
  localStorage.setItem("effects", totalAutoEffect);
}

loadGame()

// ==================================
// SetInterval 
setInterval(() => {
  spendableFlowers += totalAutoEffect;
  intFlowerCountCumul += totalAutoEffect;
  flowerCount.textContent = Math.round(spendableFlowers.toFixed(2));
  flowerCountCumul.textContent = Math.round(intFlowerCountCumul.toFixed(2));
  // updateLiquidAnimation();
  displayshop();
  popFrog()
}, 1000);

setInterval(() => {
  saveGame(); // save game every 10 s
  console.log("localStorage updated");
  console.log(localStorage.getItem("itemsList"));
},10000);

// Save on page unload
window.addEventListener("beforeunload", saveGame);