import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../../models/blogModel";

dotenv.config();
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbhost = process.env.DB_HOST;

describe("Test DB", () => {
  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${dbuser}:${dbpass}@${dbhost}`,
      { useNewUrlParser: true },
      (err) => {
        err ? console.log(err) : console.log("Database Connected");
      }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should Insert and Find Blog", async () => {
    const mockBlog = { title: "Sample", body: "Sample Blog Here" };
    await Blog.create(mockBlog);

    const insertedBlog = await Blog.findOne({ title: "Sample" });
    expect(insertedBlog.title).toEqual(mockBlog.title);
    expect(insertedBlog.body).toEqual(mockBlog.body);
  }, 99999);

  it(" Should Delete a Blog", async () => {
    await Blog.findOneAndDelete({ title: "Sample" });
  }, 99999);
});
