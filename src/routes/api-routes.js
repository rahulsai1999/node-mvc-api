import { Router } from "express";
import { contactMine } from "../controllers/contactController";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "API is working",
    message: "Welcome to MVC model",
  });
});

router.get("/contact", contactMine);

export default router;
