const chalk = require('chalk');

var BasicCard = function(front, back){
  this.front = front;
  this.back = back;
}

BasicCard.prototype.printCard = function() {

  var stars = "*BASIC****";
  var dashes = "----------";

  for (var index = 0; index < this.front.length; index++) {
    stars+="*";
    dashes+="-"
  }

  console.log(
`
${chalk.red(stars)}
${chalk.yellow('FRONT:')} ${this.front}
${dashes}
${chalk.yellow('BACK:')} ${this.back}
${chalk.red(stars)}`)

};

BasicCard.prototype.getQuestion = function(){
  return this.front;
}

module.exports = BasicCard;