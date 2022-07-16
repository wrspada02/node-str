'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const mongoAtlasUri = 'mongodb+srv://william:QltWyaqLUFYVZmSQ@node-str.unv4x.mongodb.net/?retryWrites=true&w=majority';

try{
  mongoose.connect(mongoAtlasUri);
  console.log('Mongoose conected');
}catch(error){
  console.log(error);
}

//Carrega os modelos
const Product = require('./models/product');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute =  require('./routes/products-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
 
module.exports = app;