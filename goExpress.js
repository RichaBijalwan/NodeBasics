const express = require('express');
const app = express();

// here use function is been use to include static resources
// all the resources present in pages/assets folder will be accesible
// express internally handles the there content type
app.use(express.static('pages/assets'));

// handles get requests
app.get('/', (req, res) => {
  res.send('<h1> Hello Express </h1>');
});

app.get('/home.html', (req, res) => {
  // sendFile method to read through the file and send it to response with respective content type.
  res.sendFile(__dirname+'/pages/home.html');
})

app.listen(8081);