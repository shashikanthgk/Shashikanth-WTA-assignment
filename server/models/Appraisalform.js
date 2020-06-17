const Joi = require('joi');
const mongoose = require('mongoose');
 
const AppraisalForm = mongoose.model('AppraisalForm', new mongoose.Schema({
    employee_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    position: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    department: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    employeeid:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        unique: true
    },
    date_of_last_review: {
        type: Date,
        required: true,
    },
    type_of_review:{
        type: String,
        enum : ['Six Month Review','Annual Review', 'Other'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    quality_of_work:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_quality_of_service:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    productivity:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_productivity:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    knowledge_of_job:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_knowledge_of_job:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    reliability_and_dependebility:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_reliability_and_dependebility:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    attendence:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_attendence:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    initiative:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_initiative:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    creativity:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        minlength: 1,
        maxlength: 255,
    },
    comment_on_creativity:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    working_relationship:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_working_relationship:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    adherence_to_compony_policy:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_adherence_to_compony_policy:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    other:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    comment_on_other:{
        type: String,
        minlength: 1,
        maxlength: 10000,  
    },
    overall_performence_rating:{
        type: String,
        enum : ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'],        
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    supervisior_comment_on_overall_performence:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10000, 
    },
    
    action_by_employee_infuture:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10000,
    },
    
    date_reviewed_with_employee:{
        type:Date,
        required: true,
    },
}));
 


function validateForm(appraisalform) {
    const roles = ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'];

    const schema = {
        employee_name: Joi.string().min(1).max(200).required(),
        position: Joi.string().min(1).max(50).required(),
        department: Joi.string().min(1).max(255).required(),
        date_of_last_review:Joi.date().required(),
        type_of_review:Joi.string().required(),
        quality_of_work:Joi.any().valid(...roles),
        comment_on_quality_of_service:Joi.string().min(1).max(10000),
        productivity:Joi.any().valid(...roles),
        comment_on_productivity:Joi.string().min(1).max(10000),        
        knowledge_of_job:Joi.any().valid(...roles),
        comment_on_knowledge_of_job:Joi.string().min(1).max(10000),
        reliability_and_dependebility:Joi.any().valid(...roles),
        comment_on_reliability_and_dependebility:Joi.string().min(1).max(10000),
        attendence:Joi.any().valid(...roles),
        comment_on_attendence:Joi.string().min(1).max(10000),
        initiative:Joi.any().valid(...roles),
        comment_on_initiative:Joi.string().min(1).max(10000),
        creativity:Joi.any().valid(...roles),
        comment_on_creativity:Joi.string().min(1).max(10000),
        working_relationship:Joi.any().valid(...roles),
        comment_on_working_relationship:Joi.string().min(1).max(10000),
        adherence_to_compony_policy:Joi.any().valid(...roles),
        comment_on_adherence_to_compony_policy:Joi.string().min(1).max(10000),
        other:Joi.any().valid(...roles),
        comment_on_other:Joi.string().min(1).max(10000),
        overall_performence_rating:Joi.any().valid(...roles),
        supervisior_comment_on_overall_performence:Joi.string().min(1).max(10000).required(),
        action_by_employee_infuture:Joi.string().min(1).max(10000).required(),
        date_reviewed_with_employee:Joi.date().required()
    };
    return Joi.validate(appraisalform, schema);
}
 
exports.AppraisalForm = AppraisalForm;
exports.validate = validateForm;