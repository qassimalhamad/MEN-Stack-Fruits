// controllers/fruits.js

const Fruit = require('../models/fruit');

const index = async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render('fruits/index.ejs', { fruits: foundFruits });
};

const landingPage = (req, res, next) => {
  res.render('index.ejs');
}

const fruitId =  async (req, res, next) => {
    const fruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', { fruit : fruit });
  };

const deleteFruit =  async (req, res, next) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect('/fruits');
};

const editFruit = async (req, res, next) => {
    const fruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/edit.ejs', { fruit });
  }

const updateFruit = async (req, res, next) => {
    if (req.body.isReadyToEat === 'on') {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
  
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect(`/fruits/${req.params.fruitId}`);
  }

const postFruit = async (req, res, next) => {
    // first make sure that the data from the checkbox
    // is a boolean, by overwriting the req.body.isReadyToEat
    if (req.body.isReadyToEat === 'on') {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
  
    // inser the req body into the database
    await Fruit.create(req.body);
    res.redirect('/fruits');
  }
const newFruit = (req, res, next) => {
    res.render('fruits/new.ejs');
  }

module.exports = {
  index,
  fruitId,
  deleteFruit,
  editFruit,
  updateFruit,
  postFruit,
  newFruit,
  landingPage,
};