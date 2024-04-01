require('./config/config');

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const methodOverride = require("method-override");
const webpush = require('web-push');
const fs = require('fs');
var cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin:['http://localhost:4200',
          'http://127.0.0.1:4200', 
          'http://127.0.0.1:8080'],
  credentials:true
}));

// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas
app.use(require('./routes/index'));
app.use(methodOverride());

let renderHTML = path.resolve(__dirname, '../public/index.html');

//console.log(path.resolve('/uploads'));

app.use('/src/uploads', express.static(path.resolve('src/uploads')));
app.use('/src/avatars', express.static(path.resolve('src/avatars')));

app.get('/', function (req, res) {
  res.sendFile(renderHTML);
})
console.log(process.env.URLDB)
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { 
  console.log('Base de Datos Conectada!');
})
.catch((err) => {
  console.log(err);
});

app.listen(process.env.PORT, ()=> {
    console.log("Node server running on http://localhost:" + process.env.PORT);
})