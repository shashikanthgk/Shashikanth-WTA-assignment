const { AppraisalForm, validate } = require('../models/Appraisalform');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports.submitappraisal =async function(req,res){
let eid = req.params.eid;
const email = req.data['usertoken']['email']
let employee = await Employee.findOne({employeeid:eid});
let admin = await Admin.findOne({email:email});
if(admin==null)
{
    res.json({error:"admin not found error"});
}
else if(employee==null)
{
    res.json({error:"employee not found error"});
}
else if((admin['org_name']!=employee['org_name']))
{
    res.json({error:"auth error"});
}
else{
    console.log("form",req.body.form);
    const {error} =  validate(req.body.form);
    if(error){
        res.send(error.details[0].message)
    }
    else
    {
        appform = new AppraisalForm({
            employee_name: req.body.form.employee_name,
            position: req.body.form.position,
            department: req.body.form.department,
            employeeid:eid,
            date_of_last_review: req.body.form.date_of_last_review,
            type_of_review: req.body.form.type_of_review,



            quality_of_work: req.body.form.quality_of_work,
            comment_on_quality_of_service:req.body.form.comment_on_quality_of_service,
            productivity: req.body.form.productivity,
            comment_on_productivity:req.body.form.comment_on_productivity,
            knowledge_of_job: req.body.form.knowledge_of_job,
            comment_on_knowledge_of_job: req.body.form.comment_on_knowledge_of_job,
            reliability_and_dependebility: req.body.form.reliability_and_dependebility,
            comment_on_reliability_and_dependebility: req.body.form.comment_on_reliability_and_dependebility,
            attendence:req.body.form.attendence,
            comment_on_attendence: req.body.form.comment_on_attendence,



            initiative:req.body.form.initiative,
            comment_on_initiative: req.body.form.comment_on_initiative,
            creativity:req.body.form.creativity,
            comment_on_creativity: req.body.form.comment_on_creativity,
            working_relationship: req.body.form.working_relationship,
            comment_on_working_relationship: req.body.form.comment_on_working_relationship,
            adherence_to_compony_policy: req.body.form.adherence_to_compony_policy,
            comment_on_adherence_to_compony_policy:req.body.form.comment_on_adherence_to_compony_policy,


            other: req.body.form.other,
            comment_on_other: req.body.form.comment_on_other,
            overall_performence_rating:req.body.form.overall_performence_rating,
            supervisior_comment_on_overall_performence: req.body.form.supervisior_comment_on_overall_performence,
            action_by_employee_infuture: req.body.form.action_by_employee_infuture,
            date_reviewed_with_employee: req.body.form.date_reviewed_with_employee,


        });




        await appform.save( (err,result)=>{
            if(err)
            {
                console.log(err);
                res.json({error:err})  
            }
            else{
                res.json(result);
                 }
        })

    }
}
}







