'use strict'
const express = require('express');
var Note = require('../models/noteModel');

function createNote(req, res) {
  var note = new Note();

  note.NoteTitle = req.body.NoteTitle;
  note.NoteDescription = req.body.NoteDescription;
  note.UserId = req.user.sub;

  note.save((err, noteStored) => {
    if (err) return res.status(500).send({
      message: 'Error al guardar la nota'
    });

    if (noteStored) {
      res.status(200).send({
        note: noteStored
      })
    } else {
      res.status(404).send({
        message: 'no se ha registrado la nota'
      });
    }
  });

}

function readNote(req, res) {
  var userId = req.user.sub;

  Note.find(userId, (err, noteRead) => {

    if (err) return res.status(500).send(err)

    return res.status(200).send(noteRead);
  });

}


function updateNote(req, res) {

  var noteId = req.params.id;
  var params = req.body;

  Note.findByIdAndUpdate(noteId, params, {
      new: true
    },
    (err, noteUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });

      if (!noteUpdated) return res.status(404).send({
        message: 'No se ha podido actualizar la nota'
      });

      return res.send(noteUpdated);
    }
  )
}

function deleteNote(req, res) {
  var noteId = req.params.id;


  Note.findByIdAndRemove(noteId, (err, noteDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });

    if (!noteDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar la nota'
    });

    return res.status(200).send({
      message: 'Nota eliminada'
    });
  });
}

module.exports = {
  createNote,
  readNote,
  updateNote,
  deleteNote
}
