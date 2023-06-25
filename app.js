class Dino {
  constructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareHeight(humanHeight) {
    if (this.height > humanHeight) {
      return `The ${this.species} is taller than you!`;
    } else if (this.height < humanHeight) {
      return `The ${this.species} is shorter than you!`;
    } else {
      return `The ${this.species} is the same height as you!`;
    }
  }
  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareWeight(humanWeight) {
    if (this.weight > humanWeight) {
      return `The ${this.species} is heavier than you!`;
    } else if (this.weight < humanWeight) {
      return `The ${this.species} is lighter than you!`;
    } else {
      return `The ${this.species} is the same weight as you!`;
    }
  }
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareDiet(humanDiet) {
    if (this.diet.toLowerCase() === humanDiet.toLowerCase()) {
      return `The ${this.species} and you have the same diet!`;
    } else {
      return `The ${this.species} and you have different diets!`;
    }
  }
}

// Create Dino Objects
const dinos = [];
fetch("dino.json")
  .then((response) => response.json())
  .then((data) => {
    data.Dinos.forEach((data) => {
      const dino = new Dino(
        data.species,
        data.weight,
        data.height,
        data.diet,
        data.where,
        data.when,
        data.fact
      );
      dino.image = `./images/${data.species.toLowerCase()}.png`;
      dinos.push(dino);
    });
  });

// Create Human Object
// Use IIFE to get human data from form
function getUserInput() {
  const input = (function () {
    let name = document.getElementById("name").value;
    let feet = document.getElementById("feet").value;
    let inches = document.getElementById("inches").value;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value;
    let image = `./images/human.png`;

    function getName() {
      return name;
    }
    function getHeight() {
      feet = Number(feet);
      inches = Number(inches);
      let heightInInches = feet * 12 + inches;
      return heightInInches;
    }
    function getWeight() {
      return weight;
    }
    function getDiet() {
      return diet;
    }
    function getImage() {
      return image;
    }
    return {
      name: getName(),
      height: getHeight(),
      weight: getWeight(),
      diet: getDiet(),
      image: getImage(),
    };
  })();
  return input;
}

// Create a Tile class
class Tile {
  constructor(name, image, fact) {
    this.name = name;
    this.image = image;
    this.fact = fact;
  }
}

//get random fact
const getRandomFact = (dino, human) => {
  if (dino.species === "Pigeon") {
    return "All birds are Dinosaurs.";
  }

  const r = Math.floor(Math.random() * Math.floor(6));
  let strFact;

  switch (r) {
    case 0:
      strFact = `The ${dino.species} is from the ${dino.when} era`;
      break;
    case 1:
      strFact = `The ${dino.species} is found in ${dino.where}`;
      break;
    case 2:
      strFact = dino.compareHeight(human.height);
      break;
    case 3:
      strFact = dino.compareWeight(human.weight);
      break;
    case 4:
      strFact = dino.compareDiet(human.diet);
      break;
    case 5:
    default:
      strFact = dino.fact;
  }
  return strFact;
};

// Generate Tiles for each Dino in Array
const generateTiles = function () {
  let tiles = [];
  dinos.forEach((dino, index) => {
    let tile;
    if (index === 4) {
      tile = new Tile(human.name, human.image, "");
      tiles.push(tile);
    }

    tile = new Tile(dino.species, dino.image, getRandomFact(dino, human));
    tiles.push(tile);
  });

  // Add tiles to DOM
  const grid = document.getElementById("grid");
  tiles.forEach((tile) => {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    grid.appendChild(gridItem);

    let name = document.createElement("h3");
    name.innerHTML = tile.name;
    gridItem.appendChild(name);

    let image = document.createElement("img");
    image.src = tile.image;
    image.alt = tile.name;
    gridItem.appendChild(image);

    let fact = document.createElement("p");
    fact.innerHTML = tile.fact;
    gridItem.appendChild(fact);
  });

  // Remove form from screen
  (function () {
    let myForm = document.getElementById("dino-compare");
    myForm.style.display = "none";
  })();
};

let human;
// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", (event) => {
  event.preventDefault;
  human = getUserInput();

  // Prepare and display infographic
  generateTiles();
});
