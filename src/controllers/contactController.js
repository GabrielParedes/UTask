'use strict'
const express = require('express');
const nodemailer = require('nodemailer');

function sendContact(req, res) {
  var smtpTransport = nodemailer.createTransport('smtp', {
    service: 'gmail',
    auth: {
      user: 'helloutask@gmail.com',
      pass: 'contactoutask'
    }
  });

  //const estilo = '<b>Hello world?</b>';

  var mailOptions = {
    from: req.body.contactName,
    to: "helloutask@gmail.com",
    subject: req.body.contactSubject,
    text: "Hola UTask,"
          + "\nMi nombre es: "
          + req.body.contactName
          + "\nMi correo electronico es: "
          + req.body.contactEmail
          + "\n\n"
          + req.body.contactText,
    //html: '<b>Hola UTask</b><p>Mi nombre es: {{req.body.contactName}}</p>'
  };
  smtpTransport.sendMail(mailOptions, function(err, resp) {
    if (err) {
      res.status(404).send({
        message: "no enviado 1"
      });
      console.log(err);
    } else {

      var mailOptions = {

        from: "helloutask@gmail.com",
        to: req.body.contactEmail,
        subject: "UTask's message",
        text: "Hola, "
              + req.body.contactName
              + "\nGracias por tu comentario: \n"
              + req.body.contactText
              + "\n\n Atentamente, equipo Omen"
        //html: '<b>Hola UTask</b><p>Mi nombre es: {{req.body.contactName}}</p>'
      };

      smtpTransport.sendMail(mailOptions, function(err, resp) {
        if (err) {
          res.status(404).send({
            message: "no enviado 2"
          });
          console.log(err);
        } else {
          res.status(200).send({
            message: "enviado"
          });
          console.log('Mensaje enviado');
        }
      });
    }
  });
};

module.exports = {
  sendContact
};
