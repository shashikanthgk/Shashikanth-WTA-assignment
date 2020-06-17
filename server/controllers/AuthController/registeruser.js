const { Employee, validate } = require('../../models/Employee');
const { User, validateuser } = require('../../models/User');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

module.exports.register =async function(req,res){
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        
        return res.status(400).send(error.details[0].message);
    }
    else{
    const session =await mongoose.startSession();
    session.startTransaction();
        const opts = {session,new:true}
    // Check if this Employee already exisits
    let user = await User.findOne({ email: req.body.email });
    let user2= await Employee.findOne({employeeid:req.body.employeeid});
    if (user) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).send('That user already exisits!');
    }
    else if(user2)
    {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).send('That employeeid already exisits!');
    }
    
    else {
        // Insert the new Employee if they do not exist yet
        employee = new Employee({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            employeeid:req.body.employeeid,
            org_name:req.body.org_name,
            password: req.body.password,
        });
        await employee.save(async (error,result)=>{
            if(error)
            {
                await session.abortTransaction();
                session.endSession();
                console.log("err1",err)
                return res.status(400).json({error:error}) 
            }
            else
            {
                user = new User({
                    email:req.body.email,
                    password:req.body.password,
                    type:'user'
    
                });
                await user.save(async(error2,result2)=>{

                    if(error2)
                    {
                        await session.abortTransaction();
                        session.endSession();
                        res.status(400).json(error2); 
                    }
                    else{
                        await session.commitTransaction();
                        session.endSession();
                        res.status(200).json({result,result2});
                    }
           
                })

            }


        });

    }
    }

}
 
