var request = require("request");
var userDetails;

function initialize() {
    console.log("inside initialize()");
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                console.log("error - ");
                reject(err);
            } else {
                console.log("got the response 😎");
                resolve(JSON.parse(body));
            }
        })
    })

}

function main() {
    console.log("main() called");
    var initializePromise = initialize();
    console.log("initialize() called");
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here
        console.log(userDetails)
    }, function(err) {
        console.log(err);
    })
}

main();
