const bcrypt = require('bcrypt');
const db = require('../database/mysql.config');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.registerUser = async(nameuser, correoelectronico, password) => {
    try {
        const [rows] = await db.promise().query('select nameuser from USUARIO where nameuser = ?', [nameuser]);
        if(rows.length > 0){
            throw new Error('Este nombre de usuario ya existe, favor de poner otro');
        }

        const salt = 10;
        const hash = await bcrypt.hash(password, salt);

        await db.promise().query(
            'INSERT INTO usuario (nameuser,correoelectronico,password) VALUES (?,?,?)',
            [nameuser, correoelectronico, hash]
        );

    } catch (error) {
        console.log('Error en la base de datos', error);
        throw new Error('Error al registrar el usuario')
    }
}

exports.loginUser = async(nameuser,password) => {
    //console.log("Contraseña recibidad desde el front-end: ",password);
    try {
        const [rows] = await db.promise().query('SELECT * FROM USUARIO WHERE nameuser = ?',[nameuser]);
        if(rows.length ===0){
            throw new Error('Credenciales incorrectas');
        }

        const user = rows[0];        

        const match = await bcrypt.compare(password, user.password);
        //console.log("¿Coinciden las contraseñas?:", match);
        if(!match){
            throw new Error('Credenciales incorrectas2');
        }        

        const token = jwt.sign({ id: user.id, nameuser: user.nameuser}, jwtSecret);
        return{
            user: user.nameuser,
            token: token
        };
    } catch (error) {
        throw new Error(error.message);
        console.log(error.message);
    }
}