import { Router } from "express";
import { insertBlog } from "../controllers/blogController";
import isLoggedIn from "../middleware/isLoggedIn";
const router = Router();

router.post("/blog", isLoggedIn, insertBlog);

export default router;
