var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

var firstPresident = new BasicCard("Who was our first president?", "George Washington");
console.log(firstPresident.front);
console.log(firstPresident.back);

var firstPresidentCloze = new ClozeCard("George Washington was our first president", "George Washington");
console.log(firstPresidentCloze.cloze);
firstPresident.partial = firstPresidentCloze.getPartial();
console.log(firstPresidentCloze.partial);
console.log(firstPresidentCloze.fullText);