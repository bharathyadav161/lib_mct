const express = require('express');
const cors = require('cors');
const app = express();
const dotenv=require('dotenv')
dotenv.config()
//const whitelist = ['http://localhost:3000', 'http://localhost:5000','https://lib-manage.herokuapp.com/','https://lib-manage.herokuapp.com:3000','https://lib-manage.herokuapp.com:5000'];
const whitelist = ['http://localhost:3000', 'http://localhost:5000','https://gold-glorious-hedgehog.cyclic.app/','https://gold-glorious-hedgehog.cyclic.app:3000','https://gold-glorious-hedgehog.cyclic.app:5000'];

//const whitelist = ['http://localhost:3000', 'http://localhost:5000',process.env.baseurl];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);