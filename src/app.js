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

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //No * colocar URLs que vao fazer requisicao ao seu servidor
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token'); //Colocar 'x-access-token'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); //Os metodos liberados na nossa API.
  next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;