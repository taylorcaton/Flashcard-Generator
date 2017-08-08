var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require('fs');
var inquirer = require('inquirer');
var cards = [];
var jsonfile = require('jsonfile')
var file = 'cards.json'

function start(){
  inquirer.prompt([
    {
      name: "start",
      type: "list",
      choices: ["View Cards", "Add Card", "Remove Card", "Restore Original Cards", "Exit"],
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
          removeCard();
          break;
        
        case "Restore Original Cards":
          console.log("Restoring OG set");
          restoreCards();
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
  cardsJSON = flashCards;

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

      case "Back":
        start();
        break;
      
      default:
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
      writeCardsToJSON();
      start();
    })

  }

  function addCloze(){
    inquirer.prompt([
      {
        name: "text",
        message: "Input the question full text (Front of the Card)"
      },
      {
        name: "cloze",
        message: "Input the word to hide (Back of the Card)"
      }
    ]).then(function(answers){
      
      var newCloze = new ClozeCard(answers.text, answers.cloze);
      newCloze.getPartial();

      if(newCloze.partial === ""){
        console.log(`${answers.cloze} was NOT found in ${answers.text}`);
        addCloze();
      }else{
        cards.push(newCloze)
        writeCardsToJSON();
        start();
      }
    })
  }

}

function viewCards(){
  cards.forEach(function(card){
    card.printCard();
  })
  start();
}

function removeCard(){
  var questions = [];

  cards.forEach(function(card, index){
    questions.push(`${index+1}. ${card.getQuestion()}`);
  })
  
  inquirer.prompt([
    {
      type: "list",
      choices: questions,
      message: "Which question would you like to remove? (type the number)",
      name: "choice"
    }
  ]).then(function(answer){
    var index = parseInt(answer.choice.substring(0,answer.choice.indexOf(".")));
    console.log(`Removing ${index}`)
    cards.splice(index-1,1);
    writeCardsToJSON();
    start();
  })
}

function writeCardsToJSON(){ //updates the cards.json with the contents of cards array

  var cardsJSON = [];
  cards.forEach(function(card){
    if(card.cloze !== undefined){
      cardsJSON.push({type:"Cloze", text: card.fullText , cloze: card.cloze});
    }else{
      cardsJSON.push({type:"Basic", front: card.front, back: card.back });
    }
  })

  var obj = {cards: cardsJSON};
  jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
      if(err) console.error(err)
  })
}

function restoreCards(){

  var backupFile = 'cardsBackup.json';
  
  jsonfile.readFile(backupFile, function(err, obj) {

    jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
        if(err) console.error(err);
    })
        
  });
 
}

buildCards();
start();