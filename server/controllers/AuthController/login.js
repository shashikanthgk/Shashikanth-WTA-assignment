const { User, validate } = require('../../models/User');
const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports.login =async function(req,res){

    let user = await User.findOne({ email: req.body.email });
    console.log()
    if(!user)
    {
        res.status(400).json({error:"Email does not exist"})
    }
    else if( user['password']==req.body.password)
    {
        const  usertoken =  user;
            const token = jwt.sign({usertoken},"I am inevitable");
            res.status(200).json({
                data:{user:user,token:token},
                message:'successfully authenticated',   
            })
    }
    else{

        res.json({error:"authenttication error"});
        }
    
}
 
