'use strict'
const express = require('express');
var Schedule = require('../models/scheduleModel');
var path = require('path');
var fs = require('fs');

//modificar note por schema las minusculas

function listSchedules(req, res) {
  Schedule.findOne((error, notes) => {
    if (error) return res.status(500).send(err)
    return res.status(200).send(notes);
  })
}

/*Kitten.findById(req.params.kittenId, (err, kitten) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(kitten)
});*/

function createSchedule(req, res) {
  var note = new Schedule();

  note.SchemaDay = req.body.SchemaDay;
  note.SchemaDescription = req.body.SchemaDescription;
  note.SchemaStart = req.body.SchemaStart;
  note.SchemaEnd = req.body.SchemaEnd;
  //Foranea
  //note.UserId = req.params.UserId;

  //note.save((err, noteStored)=>{
  if (err) return res.status(500).send({
    message: 'Note register Wrong'
  });

  if (noteStored) {
    res.status(200).send({
      note: noteStored
    })
  } else {
    res.status(404).send({
      message: 'Not registered'
    });
  }
  //});

}

function updateSchedule(req, res) {
  var noteId = req.params.id;

  Schema.findByIdAndUpdate(noteId, req.body, {
      new: true
    }, (err, noteUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!noteUpdated) return res.status(404).send({
        message: 'No se ha podido eliminar la nota'
      });
      return res.send(noteUpdated);
    )
  }
}

function deleteSchedule(req, res) {
  var noteId = req.params.id;

  Schema.findByIdAndRemove(noteId, (err, noteDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });
    if (!noteDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar la nota'
    });
    return res.status(200).send({
      message: 'Usuario eliminado'
    });
  });
}


module.exports = {
  listSchemas,
  createSchema,
  updateSchema,
  deleteSchema
}
