'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (data) => {
  const customer = new Customer(data);
  await customer.save();
}

exports.authenticate = async(data) => {
  const res = await Customer.findOne({
      mail: data.mail,
      password: data.password
  });
  return res;
}

exports.getById = async(id) => {
  const res = await Customer.findById(id);
  return res;
}