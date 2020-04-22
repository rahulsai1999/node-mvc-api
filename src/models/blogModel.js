import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  body: String,
});

const blog = mongoose.model("blog", blogSchema);
export default blog;
