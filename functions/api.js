const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors =  require('cors');

const app = express();

// your mongoDB Cloud URL

const dbCloudUrl =
'mongodb+srv://api-calls:Tantan1227002@cluster0.h4nc7ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const dbLocalUrl = 'mongodb://localhost:27017/test';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
.connect(dbCloudUrl || dbLocalUrl)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);