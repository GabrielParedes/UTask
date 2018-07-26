'use strict'
const express = require('express');
var TaskP = require('../models/taskPModel');

function createTaskP(req, res) {
  var taskP = new TaskP();
  taskP.TaskTitle = req.body.TaskTitle;
  taskP.TaskDescription = req.body.TaskDescription;
  taskP.TaskStatus = req.body.TaskStatus;
  taskP.TaskPriority = req.body.TaskPriority;
  taskP.UserId = req.user.sub;

  taskP.save((err, taskPStored) => {
    if (err) return res.status(500).send({
      message: 'Error al guardar la tarea personal'
    });

    if (taskPStored) {
      res.status(200).send({
        taskP: taskPStored
      })
    } else {
      res.status(404).send({
        message: 'no se ha registrado la tarea personal'
      });
    }
  });

}

function readTaskP(req, res) {
  var userId = req.user.sub;

  TaskP.find(userId, (err, taskPRead) => {

    if (err) return res.status(500).send(err)

    return res.status(200).send(taskPRead);
  });

}


function updateTaskP(req, res) {

  var taskPId = req.params.id;
  var params = req.body;

  TaskP.findByIdAndUpdate(taskPId, params, {
      new: true
    },
    (err, taskPUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });

      if (!taskPUpdated) return res.status(404).send({
        message: 'No se ha podido actualizar la tarea personal'
      });

      return res.send(taskPUpdated);
    }
  )
}

function deleteTaskP(req, res) {
  var taskPId = req.params.id;


  TaskP.findByIdAndRemove(taskPId, (err, taskPDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });

    if (!taskPDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar la tarea personal'
    });

    return res.status(200).send({
      message: 'Tarea personal eliminada'
    });
  });
}

module.exports = {
  createTaskP,
  readTaskP,
  updateTaskP,
  deleteTaskP
}
