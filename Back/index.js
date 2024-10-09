const express = require("express");
const db = require('./database/mysql.config');
const cors = require('cors');

//console.log("desde el index...js");

//Creamos el servidor
const app = express();
const port = 4000;

//Conexion a base de datos
//db();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/user'));

//Definimos rutas principales
/*app.get('/',(req, res) => {
    
    db.query('select * from usuario', (err, results) =>{
        if(err){
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error al ejecutar la consulta');
        } else {
            res.json(results);
        }
    });
})*/

app.listen(port, () =>{
    console.log(`El servidor esta corriendo en http://localhost:${port}`);
});