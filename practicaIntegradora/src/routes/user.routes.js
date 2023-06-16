import { Router } from "express";
import { userModel } from "../models/Users.js";
import { hashData, compareData } from "../path.js";
const UserRouter = Router();

UserRouter.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.redirect("/api/views");
    }
  });
});

// persistencia mongo

UserRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.redirect("/api/errorSignup");
  }
  const hashPassword = await hashData(password);
  const newUser = { ...req.body, password: hashPassword };
  await userModel.create(newUser);
  res.redirect("/api/");
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.redirect("/api/errorLogin");
  }
  const isPasswordValid = await compareData(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Email or password not valid" });
  }
  req.session.user = user;
  //req.session.email = email
  //req.session.password = password
  res.redirect("/api/profile");
});
export default UserRouter;
