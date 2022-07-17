'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (data) => {
  const customer = new Customer(data);
  await customer.save();
}

exports.get = async () => {
  const res = await Customer.find({
    active: true
  }, 'title price slug');
  return res;
}

