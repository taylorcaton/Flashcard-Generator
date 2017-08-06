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

module.exports = ClozeCard;