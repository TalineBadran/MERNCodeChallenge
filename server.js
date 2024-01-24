const express = require('express');
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const app  = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes)
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.listen(5000,()=>{
    console.log("app running on port 5000")
})