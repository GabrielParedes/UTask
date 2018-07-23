'use strict'
const express = require('express');
var Schedule = require('../models/scheduleModel');

function createSchedule(req, res) {
  var schedule = new Schedule();

  schedule.SchemaDay = req.body.SchemaDay;
  schedule.SchemaDescription = req.body.SchemaDescription;
  schedule.SchemaStart = req.body.SchemaStart;
  schedule.SchemaEnd = req.body.SchemaEnd;
  schedule.UserId = req.user.sub;

  schedule.save((err, scheduleStored) => {
    if (err) return res.status(500).send({
      message: 'Error al guardar el evento'
    });

    if (scheduleStored) {
      res.status(200).send({
        schedule: scheduleStored
      })
    } else {
      res.status(404).send({
        message: 'no se ha registrado el evento'
      });
    }
  });

}

function readSchedule(req, res) {

  Schedule.find((err, scheduleRead) => {

    if (err) return res.status(500).send(err)

    return res.status(200).send(scheduleRead);
  });

}


function updateSchedule(req, res) {

  var scheduleId = req.params.id;
  var params = req.body;

  Schedule.findByIdAndUpdate(scheduleId, params, {
      new: true
    },
    (err, scheduleUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });

      if (!scheduleUpdated) return res.status(404).send({
        message: 'No se ha podido actualizar el evento'
      });

      return res.send(scheduleUpdated);
    }
  )
}

function deleteSchedule(req, res) {
  var scheduleId = req.params.id;


  Schedule.findByIdAndRemove(scheduleId, (err, scheduleDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });

    if (!scheduleDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar el evento'
    });

    return res.status(200).send({
      message: 'Nota eliminada'
    });
  });
}

module.exports = {
  createSchedule,
  readSchedule,
  updateSchedule,
  deleteSchedule
}
