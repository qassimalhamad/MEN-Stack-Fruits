require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

// DATABASE

require('./config/database');

const Fruit = require("./models/fruit.js");

const app = express();

// MiddleWare
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }));


// Routes

app.get("/",  (req, res) => {
    res.send("Hello, Buddy!");
  });

app.get('/' , (req,res, next )=>{
    res.render('index.ejs')
})

// Fruits

// GET /fruits/new
app.get('/fruits/new', (req, res , next) => {
    res.render('fruits/new.ejs');
  });


app.post("/fruits", async (req, res) => {
    if(req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true;
    }else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });

app.listen(3000 , ()=> {
    console.log('Listening to Port 3000')
})