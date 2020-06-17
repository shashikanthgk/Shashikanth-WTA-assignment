const Joi = require('joi');
const mongoose = require('mongoose');
 
const Admin = mongoose.model('Admin', new mongoose.Schema({
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
    org_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },


}));
 
function validateAdmin(admin) {
    const schema = {
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        org_name:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(admin, schema);
}
 
exports.Admin = Admin;
exports.validate = validateAdmin;