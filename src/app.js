'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const config = require('./config');

try{
  mongoose.connect(config.connectionString);
  console.log('Mongoose conected');
}catch(error){
  console.log(error);
}

//Carrega os modelos
require('./models/product');
require('./models/customer');
require('./models/order');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute =  require('./routes/products-route');
const customerRoute =  require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;