import passport from "passport";

const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", (err, contact, info) => {
    if (err) {
      res.json(err);
    }
    if (!contact) {
      res.json({ error: "Invalid Credentials" });
    }
    if (contact) {
      next();
    }
  })(req, res, next);
};

export default isLoggedIn;
