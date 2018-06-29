'use strict'

var TaskM = require('../models/taskM');

function saveTaskM(req, res){
	var taskM = new TaskM();
	var params = req.body;


	if(params.TaskDescription && params.TaskStatus && params.TaskPriority && params.TaskPriority){
		taskM.TaskDescription = params.TaskDescription;
    taskM.TaskStatus= params.TaskStatus;
    taskM.TaskPriority=params.TaskPriority;
    taskM.MemberId = req.user.sub;


		TaskM.save((err, taskMStored) =>{
			if(err) return res.status(500).send({message: 'erro al guardar'});

			if(taskMStored){
				res.status(200).send({taskM: taskMStored});
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

function getTaskM(req, res){
	var MemberId = req.params.id;

	if(MemberId != req.user.sub){
		return res.status(500).send({message: 'no tiene los permisos necesarios'});
	}else{

		TaskM.find({MemberId: MemberId}, (err, taskM) =>{
			if(err) return res.status(500).send({message: 'error en la peticion'});

			if(!taskM) return res.status(404).send({message: 'el usuario no tiene ninguna tarea agregada'});

			return res.status(200).send({taskM});
		});


	}
}


module.exports = {
	saveTaskM,
	getTaskM,
}
