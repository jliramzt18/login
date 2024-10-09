const mysql = require('mysql2');
const { dbConfig } = require('../config/config');

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if(err){
        console.log("Error al conectar a BASE DE DATOS; ". err);
        process.exit(1);
    }

    console.log("Conectado a base de datos MYSQL");
});

module.exports = connection;