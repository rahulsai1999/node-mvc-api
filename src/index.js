//dependencies
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

//routes import
import apiRoutes from "./routes/api-routes";
import authRoutes from "./routes/auth-routes";
import blogRoutes from "./routes/blog-routes";

//model import
import Contact from "./models/contactModel";

const app = express();
dotenv.config();

const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbhost = process.env.DB_HOST;

//utilities
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect(
  `mongodb://${dbuser}:${dbpass}@${dbhost}`,
  { useNewUrlParser: true },
  (err) => {
    err ? console.log(err) : null;
  }
);

//auth utilities
let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};
app.use(passport.initialize());
passport.use("local", new LocalStrategy(Contact.authenticate()));
passport.use(
  "jwt",
  new JwtStrategy(options, (jwt_payload, done) => {
    Contact.findOne(
      {
        _id: jwt_payload.id,
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

app.use("/", apiRoutes);
app.use("/", authRoutes);
app.use("/", blogRoutes);

export default app;
