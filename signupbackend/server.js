const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./routes/routes');
const cors = require('cors')


dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("database connected"))

// mongoose.connect(process.env.DATABASE_ACCESS || "mongodb://localhost/localUser", {
//     useNewUrlParser: true,
//     useFindAndModify: false
//  }, () => { console.log('database connected')});
 
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use('/app', routeUrls)
app.listen(4000, () => console.log("server is up and running"))