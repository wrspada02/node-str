'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

exports.post = async (req, res, next) => {
  const contract = new ValidationContract();

  contract.hasMinLen(req.body.name, 3, 'O titulo deve ter pelo menos 3 caracteres');
  contract.isEmail(req.body.mail, 'E-mail invalido');
  contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 caracteres');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try{
    await repository.create({
      name: req.body.name,
      mail: req.body.mail,
      password: md5(req.body.password + global.SALT_KEY)
    });
    res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
  }catch(e){
    res.status(400).send({ message: 'Falha ao cadastrar o cliente' });
  }
};


