'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//CONEXION
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UTaskDB').then(() => {
  console.log('Esta corriendo la base de datos');

  app.set('port', process.env.PORT || 3000);
  app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto '${ app.get('port')}'`);
  });
}).catch(err => console.log(err));

//MIDDLEWARES
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//CABEZERAS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

//CARGAR RUTAS
var user_routes = require('./routes/userRoutes');

//RUTAS
app.use(user_routes);

//EXPORTAR
module.exports = app;
