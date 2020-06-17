const { AppraisalForm, validate } = require('../models/Appraisalform');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports.getform =async function(req,res){

const email = req.data['usertoken']['email']
console.log("requets in employee",req.data);
let emp = await Employee.findOne({email:email});
if(  emp == null )
{
    res.json({error:"User not found"});
}

else{


    eid = emp['employeeid'];
    console.log(eid);
    aform = await AppraisalForm.findOne({employeeid:eid})
    if(aform) 
    {
    await AppraisalForm.findOne({employeeid:eid}).then(result=>{
        res.status(200).json(result);
    })
    .catch(error=>{
        res.json(error);
    })
    }
    
    else{
         res.json({error:"document not found for that employee id"})
        }
}
}