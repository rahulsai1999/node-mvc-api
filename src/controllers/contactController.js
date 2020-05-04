import Contact from "../models/contactModel";
import extractid from "../middleware/extract";

const contactMine = (req, res) => {
  const { id } = extractid(req.headers).body;
  Contact.findOne({ _id: id })
    .populate("blogs")
    .exec((err, contact) => {
      res.json({ contact });
    });
};

export { contactMine };
