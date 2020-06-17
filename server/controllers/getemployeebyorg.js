const { User, validate } = require('../models/User');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports.getemp =async function(req,res){

const email = req.data['usertoken']['email']
let admin = await Admin.findOne({ email: email });
if(admin)
{
const  org = admin['org_name'];
let employee = await Employee.find({org_name:org});

res.json({message:employee});
}
else
{
    res.json({error:"auth error"});
}
}

