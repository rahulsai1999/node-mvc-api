//dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

//routes import
import apiRoutes from '../routes/api-routes';
import authRoutes from '../routes/auth-routes';

//model import
import Contact from '../models/contactModel';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;


//utilities
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(`mongodb://${dbuser}:${dbpass}@ds159812.mlab.com:59812/loginegapp`,
    { useNewUrlParser: true }, (err) => {
        err ? console.log(err) : null;
    })


//auth utilities
let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SECRET
};
app.use(passport.initialize());
passport.use("local", new LocalStrategy(Contact.authenticate()));
passport.use(
    "jwt",
    new JwtStrategy(options, (jwt_payload, done) => {
        Contact.findOne(
            {
                _id: jwt_payload.id
            },
            (err, contact) => {
                if (err) {
                    console.log(err);
                }
                if (contact) {
                    done(null, contact);
                } else {
                    done(null, false);
                    console.log("Okay");
                }
            }
        );
    })
);


//routes
app.get("/", (req, res) => {
    res.json({ message: "Use /v1 to access the actual api" });
})

app.use('/v1', apiRoutes);
app.use('/v1', authRoutes);

app.listen(port, () => {
    console.log("Running on port " + port);
})