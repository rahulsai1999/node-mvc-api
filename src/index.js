import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;

import apiRoutes from '../routes/api-routes';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(`mongodb://${dbuser}:${dbpass}@ds159812.mlab.com:59812/loginegapp`, { useNewUrlParser: true }, (err) => {
    err ? console.log(err) : null;
})

app.get("/", (req, res) => {
    res.json({ message: "Use /v1 to access the actual api" });
})

app.use('/v1', apiRoutes);

app.listen(port, () => {
    console.log("Running on port " + port);
})