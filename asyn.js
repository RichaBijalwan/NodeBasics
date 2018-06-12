setTimeout(function() {
   console.log('Timeout ran at ' + new Date().toTimeString());
}, 1000);

var start = new Date();
console.log('Enter loop at: '+start.toTimeString());

var i = 0;

while(new Date().getTime() < start.getTime() + 4000) {
   i++;

}

console.log('Exit loop at: '
            +new Date().toTimeString()
            +'. Ran '+i+' iterations.');


