const express = require('express');
const router = express.Router()
const getemployee = require('../controllers/getemployeebyorg')
const jwt = require('jsonwebtoken')
const addform = require('../controllers/createappraisalform')
const update = require('../controllers/updateappraisalform')
const deleteform = require('../controllers/deleteform')
const getappemp = require('../controllers/getformemployee')
const getappadmin = require('../controllers/getempadmin')
const getname = require('../controllers/getname')

function authenticate(req,res,next)
{

  console.log("comes here",req.body);

res.header("Access-Control-Allow-Origin", "*");
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  
res.header("Access-Control-Allow-Headers", "Authorization");

    const bearerHeader = req.headers["authorization"];
    if( bearerHeader)
    {
        const bearer= bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;

        jwt.verify(token, "I am inevitable", (err, data) => {
            if(err){
              res.status(400).json({message:"unautorized",error:err})
            }else{ 
                console.log("data in auth ",data);
              req.data = data
              next()
            
            }
       
    });
}

else{
    res.json({message:"invalid token Login again in admin"})
}
}


router.get('/employee/form',authenticate,getappemp.getform);
router.get('/admin/getemployee',authenticate,getemployee.getemp)


router.post('/admin/form/:eid',authenticate,addform.submitappraisal);
router.patch('/admin/form/:eid',authenticate,update.updateappraisal);
router.delete('/admin/form/:eid',authenticate,deleteform.deleteform);
router.get('/admin/form/:eid',authenticate,getappadmin.getform);
router.get('/getemployeename/:eid',getname.getform);
router.get('*', (req, res) => res.status(404).send('Page Not found 404'));

module.exports = router;