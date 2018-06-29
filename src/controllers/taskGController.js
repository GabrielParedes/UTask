'use strict'

var TaskG = require('../models/taskG');

function createTaskG(req, res){
	var taskG = new TaskG();

	if(req.body.TaskDescription && req.body.TaskStatus && req.body.TaskPriority){
		taskG.TaskDescription = req.body.TaskDescription;
    taskG.TaskStatus= req.body.TaskStatus;
    taskG.TaskPriority=req.body.TaskPriority;
    taskG.MemberId = req.user.sub;


		TaskG.save((err, taskGStored) =>{
			if(err) return res.status(500).send({message: 'erro al guardar'});

			if(taskGStored){
				res.status(200).send({taskG: taskGStored});
			}else{
				res.status(404).send({ message: 'no se pudo guardar'});
			}
		});

	}else{

    res.status(200).send({
			message: 'envia los campos necesarios'
		});
	}
}

function getTaskG(req, res){
	var MemberId = req.params.id;

	if(MemberId != req.user.sub){
		return res.status(500).send({message: 'no tiene los permisos necesarios'});
	}else{

		TaskG.find({MemberId: MemberId}, (err, taskG) =>{
			if(err) return res.status(500).send({message: 'error en la peticion'});

			if(!taskG) return res.status(404).send({message: 'el usuario no tiene ninguna tarea agregada'});

			return res.status(200).send({taskG});
		});
	}
}


module.exports = {
	createTaskG,
	getTaskG,
}
