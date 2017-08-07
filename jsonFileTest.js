var jsonfile = require('jsonfile')
var file = 'cards.json'
var arr = [];
jsonfile.readFile(file, function(err, obj) {

    arr = obj.cards
    arr.push({
        type:"Basic",
        front:"Test front",
        back:"Test back"
    });

    write();
    
});

function write(){

    var obj = {cards: arr};
    jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
        console.error(err)
    })
}

