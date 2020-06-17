const { AppraisalForm, validate } = require('../models/Appraisalform');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports.deleteform =async function(req,res){
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



    aform = await AppraisalForm.findOne({employeeid:eid})
    if(aform) 
    {



    await AppraisalForm.deleteOne({employeeid:eid}).exec().then(async (result)=>{
        res.status(200).json(result)
    }).catch(async (err)=>{
        res.json(err);
    })
    }
    
    else{
        res.json({message:"document not found for that employee id"})
    }



}
}