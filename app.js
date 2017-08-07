var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require('fs');
var inquirer = require('inquirer');
var cards = [];

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
          viewCards();
          break;
        
        case "Add Card":
          console.log("Adding a Card");
          addCard();
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
      }//End of the switch
    })//end of the then
}//End of start()

function buildCards(){
  var flashCards = require('./cards.json');

  flashCards.cards.forEach(function(card, index) { //Reads the cards json and builds the arrays with Card objects
    if(card.type === "Basic"){
      cards.push(new BasicCard(card.front, card.back));
    }else{
      var newCloze = new ClozeCard(card.text, card.cloze);
      newCloze.getPartial(); //Builds the partial text!
      cards.push(newCloze);
    }
  });
}

function addCard(){

  inquirer.prompt([
    {
      type: "list",
      message: "What type of card?",
      choices: ["Basic", "Cloze", "Back"],
      name: "choice"
    }
  ]).then(function(answer){
    switch (answer.choice) {
      case "Basic":
        addBasic();
        break;

      case "Cloze":
        addCloze();
        break;

      default:
        start();
        break;
    }
  });//End initial prompt

  function addBasic(){

    inquirer.prompt([
      {
        name: "front",
        message: "Input the question (Front of the Card)"
      },
      {
        name: "back",
        message: "Input the answer (Back of the Card)"
      }
    ]).then(function(answers){
      
      cards.push(new BasicCard(answers.front, answers.back))
      start();
    })

  }

  function addCloze(){

  }

}

function viewCards(){
  cards.forEach(function(card){
    card.printCard();
  })
  start();
}

buildCards();
start();