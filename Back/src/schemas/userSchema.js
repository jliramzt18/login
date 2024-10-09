const Joi = require('joi');

const userSchema = Joi.object({
    nameuser: Joi.string().min(3).max(35).required(),
    //correoelectronico: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    userSchema
}