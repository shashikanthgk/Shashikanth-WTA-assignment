const { AppraisalForm, validate } = require('../models/Appraisalform');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports.updateappraisal =async function(req,res){
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

    const session =await mongoose.startSession();
    session.startTransaction();

    aform = await AppraisalForm.findOne({employeeid:eid})
    if(aform) 
    {

    let form = aform.toObject()
    delete form._id;
    delete form.__v;
    delete form.employeeid;
    for (var key in req.body){
        var attrName = key;
        var attrValue = req.body[key];
        form[attrName] = attrValue;
        console.log(attrName,attrValue)
    }
    // for (const ops of req.body) {
    //     form[ops.propName] = ops.value;
    //  }

    const {error} =  validate(form);
    if(error){
        await session.abortTransaction();
        session.endSession();
        res.json({error:error.details[0].message})
    }
    else{
    
    await AppraisalForm.updateOne({employeeid:eid},{ $set: form }).exec().then(async (result)=>{
        await session.commitTransaction();
        session.endSession();
        res.status(200).json(result)
  
    }).catch(async (err)=>{
    await session.abortTransaction();
    session.endSession();
        res.json(err);

    })
    }
    }
    else{
        await session.abortTransaction();
        session.endSession();
        res.json({error:"No document",ssage:"document not found for that employee id"})

    }



}
}