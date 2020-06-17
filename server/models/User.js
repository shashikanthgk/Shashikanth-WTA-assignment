const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    type:
    {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    }


}));
 
function validateuser(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        type:Joi.string().min(4).max(10).required(),
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateuser;