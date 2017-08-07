var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require('fs');
var inquirer = require('inquirer');

function start(){
  inquirer.prompt([
    {
      name: "start",
      type: "list",
      choices: ["View Cards", "Add Card", "Remove Card", "Exit"],
      message: "What would you like to do?"
    }
  ]).then(function(answer){
      switch (answer.start) {
        case "View Cards":
          console.log("Viewing Cards")
          // viewCards();
          break;
        
        case "Add Card":
          console.log("Adding a Card");
          //addCard();
          break;
        
        case "Remove Card":
          console.log("Removing a Card");
          //removeCard();
          break;

        case "Exit":
          return; 
        
        default:
          console("Error");
          break;
      }
        start();
    })
}

start();