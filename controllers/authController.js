import Contact from '../models/contactModel';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const LoginContact = (req, res, next) => {
    passport.authenticate("local", (err, contact, info) => {
        if (err)
            return next(err);
        if (!contact)
            return res.json({ error: "Invalid Credentials" });
        if (contact) {
            const token = jwt.sign({ id: contact._id, username: contact.username }, secret);
            return res.json({ token: token });
        }
    })(req, res, next);
}

const RegisterContact = (req, res) => {
    Contact.register(new Contact({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone
    }), req.body.password, (err, user) => {
        if (err) { res.json(err); }
        res.json({ message: "Contact Registered", data: user });
    }
    );
}

export { LoginContact, RegisterContact }