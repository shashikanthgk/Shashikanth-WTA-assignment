const { Admin, validate } = require('../../models/Admin');
const { User, validateuser } = require('../../models/User');
const express = require('express');
const db = require('../../db')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')

module.exports.registeradmin = async function(req,res){


    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else{
    // Check if this Employee already exisits

    const session =await mongoose.startSession();
    session.startTransaction();
    let admin = await User.findOne({ email: req.body.email });
    if (admin) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).send('That User already exisits!');
    } else {
        // Insert the new Employee if they do not exist yet
        admin = new Admin({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            org_name:req.body.org_name,
            password: req.body.password,
        });
        
        await admin.save( async (err,result)=>{
            if(err)
            {
                await session.abortTransaction();
                session.endSession();
                res.status(400).json({error:err})  
            }
            else{
                user = new User({
                    email:req.body.email,
                    password:req.body.password,
                    type:'admin'
    
                });
                await user.save(async (err2,res2)=>{
                    if(err2)
                    {
                    await session.abortTransaction();
                    session.endSession();
                    res.status(400).json({error:err2})  

                    }
                    else
                    {
                        await session.commitTransaction();
                        session.endSession();
                        res.status(200).json({res2,result})
                    }
                })
                


            }
        })
            
    }
    }

}
 
