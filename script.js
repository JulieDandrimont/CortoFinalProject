//  game data -- objects infos and effects
const itemsData = [
  ["Basket", 15, 1.5, 0.2, "auto", 0, "./img/basket.png", 0],
  ["Sickle", 50, 1.7, 0.4, "auto", 0, "./img/sickle.png", 0],
  ["Broom", 200, 2, 0.1, "auto", 0, "./img/broom.png", 0],
  ["Boots", 800, 2.5, 0.25, "auto", 0, "./img/boots.png", 0],
  ["Hat", 5000, 1.2, 0.5, "click", 3000, "./img/hat.png", 0],
  ["Coat", 30000, 2, 6, "click", 15000, "./img/coat.png", 0],
  ["Bag", 40000, 2, 8, "click", 35000, "./img/bag.png", 0],
  ["Wand", 110000, 3, 40, "click", 80000, "./img/wand.png", 0],
  ["Cat", 18000, 2, 0.5, "auto", 17000, "./img/cat.png", 0],
  ["Dragon", 100000, 4, 3, "auto", 80000, "./img/dragon.png", 0],
  ["Caterpillars", 4500, 1.3, 0.7, "click", 4000, "./img/caterpillars.png", 0],
  ["Fly", 4500, 1.4, 1, "click", 4000, "./img/fly.png", 0],
  ["Dragon fly", 18500, 1.6, 2.5, "click", 15000, "./img/dragon_fly.png", 0],
  ["Small cloud", 25000, 1.8, 4, "click", 20000, "./img/small_cloud.png", 0],
  ["Bell", 45000, 2.4, 10, "click", 43000, "./img/bell.png", 0],
  ["Brush", 47000, 2.6, 12, "click", 45000, "./img/brush.png", 0],
  ["Cushion", 50000, 2.8, 15, "click", 47000, "./img/cushion.png", 0],
  ["Ball of yarn", 55000, 3, 20, "click", 18000, "./img/ball_of_yarn.png", 0],
  ["Necklace", 85000, 2.2, 50, "click", 18000, "./img/necklace.png", 0],
  ["Claw", 65000, 4.2, 30, "click", 100000, "./img/claw.png", 0],
  ["Scale", 85000, 4.4, 65, "click", 100000, "./img/scale.png", 0],
  ["Red Flame", 90000, 4.6, 80, "click", 100000, "./img/fire.png", 0],
  ["Medicine", 95000, 4.8, 100, "click", 100000, "./img/medicine.png", 0],
  ["Golden Egg", 95000, 5, 150, "click", 100000, "./img/egg.png", 0]];

// DOM elements

let shopItems = document.querySelector(".container-item-shop");
let currentItems = document.querySelector(".container-current-attributs");
const btnFlower = document.querySelector(".flower");

let flowerCount = document.querySelector(".flower-count > p span");
let flowerCountCumul = document.querySelector(".flower-count > p ~ p span");

// Variables
let spendableFlowers = 0;
let intFlowerCountCumul = 0;
let flowerPerClick = 1;
let totalAutoEffect = 0;

/// ================================== EVENT FLOWER CLICK =================================== 

btnFlower.addEventListener("mousedown", () => {
  btnFlower.style.transform = "scale(1.1)"; // boop on the flower
  spendableFlowers += flowerPerClick;
  intFlowerCountCumul += flowerPerClick;

  flowerCount.textContent = Math.round(spendableFlowers); // to avoid weird numbers
  flowerCountCumul.textContent = Math.round(intFlowerCountCumul);
});

btnFlower.addEventListener("mouseup", () => {
  btnFlower.style.transform = "scale(1)"; // boop back
});

/// ================================== CLASS ITEM SHOP =================================== 
class items {
  static list = []; // usefull for the localStorage save
  
  constructor(name, price, increasePrice, effect, type, threshold, img, ownedQuantity = 0) {
    this.name = name;
    this.price = price;
    this.increasePrice = increasePrice;
    this.effect = effect;
    this.type = type;
    this.threshold = threshold;
    this.img = img;
    this.ownedQuantity = ownedQuantity;
    this.li = null;
    items.list.push(this);
  }

  // we create the shop items through JS, by default, we display them in the shop // Display mask to be implemented
  createItem() {
    const li = document.createElement("li"); 
    li.className = "item-shop";
    this.li = li;
    this.li.innerHTML = `
      <img src="${this.img}" alt="${this.name}" />
      <h3>${this.name}</h3>
      <p><span class="item-price">${parseFloat(this.price).toFixed(2)}</span> F</p>
      <p>+<span class="item-effect">${this.effect}</span></p>
      <p><span class="item-owned">${this.ownedQuantity}</span></p>
      <button class="buy-btn">Buy</button>
    `;

    shopItems.appendChild(this.li);


    const buyBtn = this.li.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      this.buy();
    });
  }
  // to purchase an item we have to have enough flowers
  buy() {
    if (spendableFlowers >= this.price) {
      spendableFlowers -= this.price; // we loose money ;( 
      flowerCount.textContent = Math.round(spendableFlowers);

      this.ownedQuantity++; 

      if (this.type === "auto") {
        totalAutoEffect += this.effect; 
      }

      this.price *= this.increasePrice;
      
      // HTML modifications here
      const priceSpan = this.li.querySelector(".item-price");
      priceSpan.textContent = parseFloat(this.price).toFixed(2); 

      const ownedSpan = this.li.querySelector(".item-owned");
      ownedSpan.textContent = this.ownedQuantity;

      const effectSpan = this.li.querySelector(".item-effect");
      effectSpan.textContent = (this.effect * this.ownedQuantity).toFixed(2);

      // log for the debug ==> later display them on the screen ?
      console.log(`You've purchased : ${this.name}, it level is now : ${this.ownedQuantity}`);
    } else {
      console.log(`You don't have enough money to buy ${this.name}`);
    }
  }
}

/// ================================== SAVE/LOAD localStorage =============================

function saveGame() {
  const prepSave = items.list.map(row => ({ // extracts the static list content to put it on a var stocked later in the localStorage
    name: row.name,
    price: row.price,
    increasePrice: row.increasePrice,
    effect: row.effect,
    type: row.type,
    threshold: row.threshold,
    img: row.img,
    ownedQuantity: row.ownedQuantity
  }));

  localStorage.setItem("itemsList", JSON.stringify(prepSave)); 
  localStorage.setItem("flowerCount", spendableFlowers);
  localStorage.setItem("flowerCountCumul", intFlowerCountCumul); 
  localStorage.setItem("clickerValue", flowerPerClick);
  localStorage.setItem("effects", totalAutoEffect);
}

function loadGame() {
  items.list = []; // to avoid doublons

  const saved = JSON.parse(localStorage.getItem("itemsList") || "[]"); 

  // checks if getItem is empty
  if (saved.length === 0) {
    console.log("No previous save found — initializing default settings.");

    itemsData.forEach(stat => {
      new items(...stat).createItem(); // load game data from the array + display it in the shop 
    });

    // set the game variables
    spendableFlowers = parseFloat(localStorage.getItem("flowerCount")) || 0;
    intFlowerCountCumul = parseFloat(localStorage.getItem("flowerCountCumul")) || 0;
    flowerPerClick = parseFloat(localStorage.getItem("clickerValue")) || 1;
    totalAutoEffect = parseFloat(localStorage.getItem("effects")) || 0;

  } else {
    console.log("A save has been found — loading...");

    shopItems.innerHTML = ""; //clear the html - to be sure 

    saved.forEach(obj => {
      const createClass = new items(  // takes localStorage former item.list and recreates it as objects + displays them on the shop
        obj.name,
        parseFloat(obj.price),
        parseFloat(obj.increasePrice),
        parseFloat(obj.effect),
        obj.type,
        parseFloat(obj.threshold),
        obj.img,
        parseInt(obj.ownedQuantity)
      );
      createClass.createItem();
    });

    spendableFlowers = parseFloat(localStorage.getItem("flowerCount")) || 0;
    intFlowerCountCumul = parseFloat(localStorage.getItem("flowerCountCumul")) || 0;
    totalAutoEffect = parseFloat(localStorage.getItem("effects")) || 0;
    flowerPerClick = parseFloat(localStorage.getItem("clickerValue")) || 1;
  }

  flowerCount.textContent = Math.round(spendableFlowers);
  flowerCountCumul.textContent = Math.round(intFlowerCountCumul);
  console.log("Game is ready <3");
}

loadGame();

// Game loop 
setInterval(() => {

  spendableFlowers += totalAutoEffect; // adds the auto generated "flower fragments" to the collected flowers (and cumul)
  intFlowerCountCumul += totalAutoEffect;
  flowerCount.textContent = Math.round(spendableFlowers);
  flowerCountCumul.textContent = Math.round(intFlowerCountCumul);
  saveGame();
}, 1000);

// Debug log
setInterval(() => {
  console.log("localStorage updated");
  console.log(localStorage.getItem("itemsList"));
}, 10000);