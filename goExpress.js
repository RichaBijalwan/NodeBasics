const express = require('express');
const app = express();

app.use(express.static('pages/assets'));

app.get('/', (req, res) => {
  res.send('<h1> Hello Express </h1>');
});

app.get('/home.html', (req, res) => {
  res.sendFile(__dirname+'/pages/home.html');
})

app.listen(8081);