const express = require('express');
var cors = require('cors');
const db = require('./db')
const router = express.Router();
var bodyParser=require('body-parser');
var app = express();
var path = require('path');
var route = require('./Routes/index');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('views', __dirname + '/views');
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(route);
