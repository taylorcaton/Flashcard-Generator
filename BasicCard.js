var BasicCard = function(front, back){
  this.front = front;
  this.back = back;
}

BasicCard.prototype.printCard = function() {

  console.log(
`
*********************************************
FRONT: ${this.front}
---------------------------------------------
ANSWER: ${this.back}
*********************************************`)

};

module.exports = BasicCard;