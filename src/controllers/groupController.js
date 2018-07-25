'use strict'
const express = require('express');
var Group = require('../models/groupModel');

function createGroup(req, res) {
  var group = new Group();

  if (req.body.GroupName) {
    group.GroupName = req.body.GroupName;
    group.GroupLogo = null;
    group.UserId = req.user.sub;

    group.save((err, groupStored) => {
      if (err) return res.status(500).send({
        message: 'error al guardar el grupo'
      });

      if (groupStored) {
        res.status(200).send({
          group: groupStored
        });
      } else {
        res.status(404).send({
          message: 'no se ha registrado el grupo'
        });
      }
    });

  } else {

    res.status(200).send({
      message: 'envia los campos necesarios'
    });
  }
}


function readGroup(req, res) {
  var userId = req.user.sub;

  Group.find(userId, (err, GroupRead) => {

    if (err) return res.status(500).send(err)

    return res.status(200).send(groupRead);
  });

}



function updateGroup(req, res) {

  var groupId = req.params.id;
  var params = req.body;

  Group.findByIdAndUpdate(groupId, params, {
      new: true
    },
    (err, groupUpdated) => {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });

      if (!groupUpdated) return res.status(404).send({
        message: 'No se ha podido actualizar el grupo'
      });

      return res.send(groupUpdated);
    }
  )
}



function deleteGroup(req, res) {
  var groupId = req.params.id;


  Group.findByIdAndRemove(groupId, (err, groupDeleted) => {
    if (err) return res.status(500).send({
      message: 'Error en la peticion'
    });

    if (!groupDeleted) return res.status(404).send({
      message: 'No se ha podido eliminar el grupo'
    });

    return res.status(200).send({
      message: 'Grupo Eliminado'
    });
  });
}

module.exports = {
  createGroup,
  readGroup,
  updateGroup,
  deleteGroup
}
