require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

// DATABASE

require('./config/database');

const app = express();


// MiddleWare
app.use(morgan('dev'))


// Routes

app.get("/",  (req, res) => {
    res.send("Hello, Buddy!");
  });

app.get('/' , (req,res, next )=>{
    res.send('index.ejs')
})


app.listen(3000 , ()=> {
    console.log('Listening to Port 3000')
})