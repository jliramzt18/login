const { userSchema } = require('../src/schemas/userSchema');
const userService = require('../service/userService');
const { jwtSecret } = require('../config/config');

exports.registerUser = async (req, res) => {
   // console.log(req.body);
    const { nameuser, correoelectronico, password } = req.body;
    //console.log({nameuser, correoelectronico, password});
    const { error } = userSchema.validate({ nameuser, password });    

    if (error){
        return res.status(400).json({
            message: 'Datos incorrectos',
            details: error.message
        });
    }

    try {
        await userService.registerUser(nameuser, correoelectronico, password);
        res.status(201).json({message: 'Usuario registrado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports.login = async(req,res) => {
    const {nameuser, password} = req.body;
    const { error }= userSchema.validate({ nameuser, password });

    console.log(req.body);

    if(error){
        return res.status(400).json({
            message: 'Datos incorrectos',
            details: error.message
        });
    }

    try {
        const data = await userService.loginUser(nameuser,password);
        res.status(201).json({
            message: 'Inicio de secion exitoso',
            user: data.user,
            token: data.token
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports.verifyToken = async(token) =>{
    try {
        const decode = await jwt.verify(token, jwtSecret);
        return decode;
    } catch (error) {
        throw new Error('Token invalido');
        
    }
}