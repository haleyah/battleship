let model = {
    boardsize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{locations: [0, 0, 0], hits: ["","",""]}, 
            {locations: [0, 0, 0], hits: ["","",""]},
            {locations: [0, 0, 0], hits: ["","",""]}],

    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            // loop through the ships
            let ship = this.ships[i];
            //get the locations of the ships
            let locations = ship.locations; 
            // determine if the players guess matches any of the locations if there is no matches -1 is returned
            let index = locations.indexOf(guess);
            //if index returns a number greater than or equal to 0 there is a hit and true is returned 
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);

                view.displayMessage('HIT!');
                //checks if ship is sunk. if ship is sunk adds one to shipsSunk property
                if  (this.isSunk(ship)) {
                    
                    view.displayMessage("you sank my Battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
            
        }
        view.displayMiss(guess);
        view.displayMessage("you Missed.");
         //otherwise there is no hit and false is returned 
        return false;
    },
    isSunk: function(ship){
        for(let i = 0; i < this.shipLength; i++) {
            //check each lacation for a ship. if any location does not equal hit then the ship is still floating and isSunk is false
            if (ship.hits[i] !== "hit") {
                return false
            }
            //otherwise isSunk is true if all lacations = hit
            
        }
        return true;

    },

   /* generateShipLocations: function() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do{
               locations = this.generateShip(); 
            } while (this.collision(locations));
            this.ships[i].locations = locations;
      }
    },
    generateShip: function() {
        let direction = Math.floor(Math.random() * 2);
        let row;
        let Col;
        if (direction === 1){
            //generate starting location for horizontal ship
            row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        } else{
            // generate starting location for vertical ship
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
        }
        let newShipLocations = [];
        for(let i = 0; i < this.shipLength; i++){
            if(direction === 1) {
                //add horizontal ship location to array
                newShipLocations.push(row + "" + (col + i));
			} else {
                //add vertical ship location to array
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

     collision: function(locations) {
		for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            
			for (let j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
    */
};


let view = {
    displayMessage: function(msg) {
        //get messageArea element from html
        var messageArea = document.getElementById("messageArea");
        //updaate text of messageArea by setting messageArea innerHTML to msg 
        messageArea.innerHTML = msg;
    },
    displayHit: function(location){

        let cell = document.getElementById(location);
        //set cell class to hit
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location){

        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");

    }
};






let controller = {

    guesses: 0,

    processGuess: function(guess){
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips){
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }

    }
}


function parseGuess(guess){
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Oops, Please enter a letter and a number on the board.");
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if(isNaN(row) || isNaN(column)) {
                alert("oops, that isn't on the board.");
        }  else if (row < 0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
     alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
        
    }
    return null;
}


function handleFireButton(){
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);

    guessInput.value = "";
}

function init(){
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
   //model.generateShipLocations();
    
    function addClickEvents(){
        let cells = document.getElementById("grid").getElementsByTagName("td");
        console.log(cells);
        for(let i = 0; i <cells.length; i++){
            cells.onclick = function() {
                let cellNum = cells[i].id;
                let cellLetter = "ABCDEFG"[cellNum[0]];
                let cellLocation = cellLetter + cellNum[1];
                guessInput.value = cellLocation;
                controller.handleFireButton();
            }
        }
    }
}
let cells = document.getElementById("grid").getElementsByTagName("td");
console.log(cells);
window.onload = init;

