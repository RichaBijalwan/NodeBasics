process.on('exit', function(code) {
    // Following code will never execute.
    setTimeout(function() { console.log("This will not run"); }, 0);
    console.log('About to exit with code:', code);
});
console.log("Program Started");

//------------
process.stdout.write("Hello World!" + "\n");


// Reading passed parameter
/*
The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched.
The first element will be process.execPath. See process.argv0 if access to the original value of argv[0] is needed. 
The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional 
command line arguments.
*/
var info = false;
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
    if (val == 'abc') {
        info = true;
    }
});
if (info) {
    console.log('abc param is passed');
}
// execution path
console.log(process.execPath);
// node platform
console.log(process.platform);
// current working directory
console.log('Current directory: ' + process.cwd());
// current version
console.log('Current version: ' + process.version);
// memory usage with types
console.log(process.memoryUsage());