// Here is where we import modules
// We begin by loading Express
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');

// DATABASE
require('./config/database');

const Fruit = require('./models/fruit.js');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// CONTROLLERS

const fruitsCtrl = require("./controllers/fruits");

// ROUTES

// Landing Page
app.get('/', fruitsCtrl.landingPage);

// Fruits
app.get('/fruits/new', fruitsCtrl.newFruit);

app.post('/fruits', fruitsCtrl.postFruit );

app.get('/fruits', fruitsCtrl.index);

app.get('/fruits/:fruitId', fruitsCtrl.fruitId);

app.delete('/fruits/:fruitId', fruitsCtrl.deleteFruit);

app.get('/fruits/:fruitId/edit', fruitsCtrl.editFruit);

app.put('/fruits/:fruitId', fruitsCtrl.updateFruit);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});