const { AppraisalForm, validate } = require('../models/Appraisalform');
const { Employee} = require('../models/Employee')
const {Admin} = require('../models/Admin')
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports.getform =async function(req,res){
let eid = req.params.eid;
const email = req.data['usertoken']['email']
const employee  = await Employee.findOne({employeeid:eid});
console.log(employee)
const admin = await Admin.find({email:email}, async(err, docs)=>{
    if(!docs.length)
    {
        res.json({error:"admin not found error"});
    }
    else if(!employee)
    {
        res.json({error:"Employee not found error"});

    }
    else if(employee['org_name']!=docs[0]['org_name'])
    {
        res.json({error:"auth error",message:"You don not have access to this page"});
    }
    else{

        console.log("DOC ",docs)
    
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
})

}