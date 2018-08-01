'use strict'
const express = require('express');
var Calendary = require('../models/calendaryModel');

function createCalendary(req, res) {
  var calendary = new Calendary();

  if (req.body.CalendaryTitle && req.body.CalendaryStartDate && req.body.CalendaryEndDate) {
    calendary.CalendaryTitle = req.body.CalendaryTitle;
    calendary.CalendaryDescription = req.body.CalendaryDescription;
    calendary.CalendaryStartTime = req.body.CalendaryStartTime;
    calendary.CalendaryEndTime = req.body.CalendaryEndTime;
    calendary.CalendaryStartDate = req.body.CalendaryStartDate;
    calendary.CalendaryEndDate = req.body.CalendaryEndDate;
    calendary.UserId = req.user.sub;


    calendary.save((err, calendaryStored) => {
      if (err) return res.status(500).send({
        message: 'Error al guardar el Calendario'
      });

      if (calendaryStored) {
        res.status(200).send({
          calendary: calendaryStored
        });
      } else {
        res.status(404).send({
          message: 'no se pudo guardar'
        });
      }
    });

  } else {

    res.status(200).send({
      message: 'envia los campos necesarios'
    });
  }
}


function readCalendary(req, res) {
  var userId = req.user.sub;

  Calendary.find({UserId: userId}, (err, calendaryRead) => {

    if (err) return res.status(500).send(err)

    return res.status(200).send(calendaryRead);
  });

}


function updateCalendary(req, res) {

  var calendaryId = req.params.id;
  var params = req.body;

  Calendary.findByIdAndUpdate(calendaryId, params, {
      new: true
    },
    (err, calendaryUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });

      if (!calendaryUpdated) return res.status(404).send({
        message: 'No se ha podido actualizar el calendario'
      });

      return res.send(calendaryUpdated);
    }
  )
}

function deleteCalendary(req, res) {
  var calendaryId = req.params.id;


  Calendary.findByIdAndRemove(calendaryId, (err, calendaryDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });

    if (!calendaryDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar'
    });

    return res.status(200).send({
      message: 'Calendario eliminado'
    });
  });
}


module.exports = {
  createCalendary,
  readCalendary,
  updateCalendary,
  deleteCalendary
}
