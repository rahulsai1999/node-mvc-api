import Blog from "../models/blogModel";
import Contact from "../models/contactModel";
import extractid from "../middleware/extract";

const insertBlog = (req, res) => {
  const { id } = extractid(req.headers).body;
  const { title, body } = req.body;
  Blog.create({ title, body }).then((blog) => {
    Contact.findOneAndUpdate({ _id: id }, { $push: { blogs: blog } }).then(
      (contact) => {
        res.json({
          message: `Blog inserted`,
          id: blog._id,
          contact: contact.username,
        });
      }
    );
  });
};

export { insertBlog };
