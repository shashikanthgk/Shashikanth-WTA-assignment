const { AppraisalForm, validate } = require('../models/Appraisalform');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports.getform =async function(req,res){

let eid = req.params.eid;
console.log("requets in employee",req.data);
let emp = await Employee.findOne({employeeid:eid});
if(  emp == null )
{
    res.json({error:"User not found"});
}

else{
    res.json(emp);

}
}