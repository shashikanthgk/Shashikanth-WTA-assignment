const Joi = require('joi');
const mongoose = require('mongoose');
 
const Employee = mongoose.model('Employee', new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    employeeid:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    org_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },


}));
 
function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        employeeid:Joi.string().min(5).max(255).required(),
        org_name:Joi.string().min(5).max(255).required().lowercase(),
    };
    return Joi.validate(user, schema);
}
 
exports.Employee = Employee;
exports.validate = validateUser;