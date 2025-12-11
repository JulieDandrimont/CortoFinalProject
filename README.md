# Readme

# MystFlora 🌸

An immersive clicker/idle game where you collect magical flowers and unlock a collection of enchanted objects.

## 📋 Description

MystFlora is an incremental game where you click on a flower to collect resources, buy upgrades, and complete your collection of mystical objects. The game combines active clicker mechanics with passive bonuses that automatically generate flowers.

## ✨ Main Features

### Game System

- **Main Clicker**: Click on the flower to collect resources
- **Passive Progression**: Buy automatic objects that generate flowers continuously
- **Upgrade System**: Objects become more expensive with each purchase but also more powerful
- **Complete Collection**: Unlock rare objects by reaching certain flower thresholds

### Object Categories

### Automatic Objects (passive generation)

- **Basket**: +0.2 flowers/sec (initial price: 15)
- **Sickle**: +0.4 flowers/sec (initial price: 50)
- **Broom**: +0.6 flowers/sec (initial price: 200)
- **Boots**: +0.8 flowers/sec (initial price: 800)
- **Cat**: +0.5 flowers/sec (initial price: 18,000)
- **Dragon**: +3 flowers/sec (initial price: 100,000)

### Click Objects (click bonus)

- **Hat**: +1 flower/click (unlocked at 3,000 flowers)
- **Coat**: +6 flowers/click (unlocked at 15,000 flowers)
- **Bag**: +8 flowers/click (unlocked at 35,000 flowers)
- **Wand**: +40 flowers/click (unlocked at 80,000 flowers)
- And many more objects to discover...

### User Interface

- **Dynamic Shop**: Objects appear progressively according to your progress
- **Current Inventory**: View your purchased objects and their cumulative effect
- **Complete Collection**: Browse all available objects in the game
- **Frog Companion**: Unlock a bonus frog at 3,000 flowers (+5 per click)

## 🛠️ Technologies Used

- **Main Language**: JavaScript (Vanilla)
- **Web Languages**: HTML5, CSS3
- **IDE**: Visual Studio Code
- **Operating System**: Windows
- **Version Control**: Git
- **Cloud Storage**: OneDrive
- **Typography**: Google Fonts (Aladin, Futura PT)
- **Additional Tools**:
    - VS Code integrated terminal
    - VS Code extensions (Live Server, etc.)

## 📂 Project Structure

`MystFlora/
│
├── index.html          # Main HTML structure
├── style.css           # Styles and animations
├── script.js           # Game logic
├── data.json          # Object data (reference)
├── README.md          # Project documentation
│
└── img/               # Graphics resources
    ├── bg.png
    ├── flower3.png
    ├── basket.png
    ├── sickle.png
    └── ...`

## 🚀 Installation and Launch

1. Clone the repository or download the project files
2. Open `index.html` in your preferred web browser
3. Start clicking on the flower!

No dependencies installation needed - the game runs directly in the browser.

## 🎮 How to Play

1. **Start**: Click on the flower to collect your first resources
2. **First Purchase**: Buy a Basket (15 flowers) to start passive generation
3. **Progression**: Keep clicking and buying upgrades
4. **Unlocks**: Reach flower thresholds to unlock new objects
5. **Collection**: View your collection via the dedicated button

### Tips

- Automatic objects generate flowers even when you're not playing
- Some objects only unlock after collecting a certain total number of flowers
- Buy the same object multiple times to increase its efficiency
- The frog appears randomly once unlocked - click it quickly!

## 🎯 Progression System

- **Available Flowers**: Resources usable for purchases
- **Cumulative Flowers**: Historical total determining unlocks
- **Dynamic Prices**: Objects become more expensive after each purchase
- **Cumulative Effects**: Buy the same object multiple times to increase its effect

### Progression Example

`Initial price: 15 flowers
Multiplier: 1.5
Price after purchase 1: 22.5 flowers
Price after purchase 2: 33.75 flowers
...`

## 🔄 Automatic Updates

The game performs calculations every second to:

- Add passively generated flowers
- Update the shop display
- Check unlock conditions
- Make companions appear

## 📝 Development

### Code Architecture

### Main Class: `items`

The `items` class manages all game objects with the following properties:

| Property | Description |
| --- | --- |
| `name` | Object name |
| `current` | Displayed in current inventory (true) or collection (false) |
| `price` | Current object price |
| `increasePrice` | Price multiplier after purchase |
| `effect` | Effect per level (flowers/sec or flowers/click) |
| `type` | "click" (click bonus) or "auto" (passive generation) |
| `threshold` | Cumulative flowers threshold to unlock |
| `img` | Path to object image |
| `level` | Number of purchases made |

### Main Methods

- `createItem()`: Generates the HTML element in the shop
- `createItemCurrent()`: Displays the object in current inventory
- `createItemCollection()`: Adds the object to the collection
- `buy()`: Handles purchase and updates

### Global Functions

- `displayshop()`: Controls object display according to thresholds
- `popFrog()`: Manages the bonus frog appearance
- `setInterval()`: Main game loop (updates every second)

## 🎨 Visual Customization

The game design uses:

- **Color Palette**: Pastel and magical tones (purple, pink, yellow)
- **Animations**: Smooth transitions on hover and interactions
- **Interface**: Responsive design adapted to different resolutions
- **Visual Effects**: Drop shadows, transparencies and glassmorphism

## 🚧 Features in Development

- [ ]  Temporary boost system with magic cauldron
- [ ]  Additional pets with unique effects
- [ ]  Progress save (localStorage)
- [ ]  Special events and daily challenges
- [ ]  Achievement system
- [ ]  Dark mode

## 📄 License

This project is a personal educational project developed as part of web development learning.

## 👨‍💻 Author

Project developed as part of CortoFinalProject.

## 🤝 Contribution

Suggestions and improvements are welcome! Feel free to open an issue or propose modifications.