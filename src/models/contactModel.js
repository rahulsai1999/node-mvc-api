import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: String,
  password: String,
  gender: String,
  phone: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
  create_date: {
    type: Date,
    default: Date.now,
  },
});

contactSchema.plugin(passportLocalMongoose);
const contact = mongoose.model("contact", contactSchema);

export default contact;
