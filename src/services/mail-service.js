'use strict';
var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    try{
        sendgrid.send({
            to: to,
            from: 'hello@balta.io',
            subject: subject,
            html: body
        })
        console.log('E-mail enviado com sucesso');
    }catch(e){
        console.log('Erro ao enviar o email ' + e);
    }
}