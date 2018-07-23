'use strict'

const express =  require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

//CARGAR RUTAS
var user_routes = require('./routes/userRoutes');
var note_routes = require('./routes/noteRoutes');
var taskP_routes = require('./routes/taskPRoutes');
var schedule_routes = require('./routes/scheduleRoutes');

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//CABEZERAS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UTaskDB').then(()=>{
    console.log('Esta corriendo la base de datos');

    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), ()=>{
        console.log(`Servidor corriendo en el puerto '${ app.get('port')}'`);
    });
}).catch(err => console.log(err));



//RUTAS
app.use('/api', user_routes);
app.use('/api', note_routes);
app.use('/api', taskP_routes);
app.use('/api', schedule_routes);

//EXPORTAR
module.exports = app;
