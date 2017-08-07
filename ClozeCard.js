const chalk = require('chalk');

var ClozeCard = function(text, cloze){
  this.cloze = cloze;
  this.fullText = text;
  this.partial = "";
}

ClozeCard.prototype.getPartial = function() {
 if(this.fullText.indexOf(this.cloze) < 0){
      console.log(`ERROR: Cloze NOT in "${this.fullText}"`);
    }else{
      this.partial = this.fullText.substring(0,this.fullText.indexOf(this.cloze)) + "..." + this.fullText.substring(this.fullText.indexOf(this.cloze)+this.cloze.length);
    }
};

ClozeCard.prototype.printCard = function() {

var stars = "*CLOZE****";
var dashes = "----------";

for (var index = 0; index < this.partial.length; index++) {
  stars+="*";
  dashes+="-"
}

  console.log(
`
${chalk.green(stars)}
${chalk.yellow('QUESTION:')} ${this.partial}
${dashes}
${chalk.yellow('ANSWER:')} ${this.cloze}
${chalk.green(stars)}`)

};

ClozeCard.prototype.getQuestion = function(){
  return this.partial;
}

module.exports = ClozeCard;