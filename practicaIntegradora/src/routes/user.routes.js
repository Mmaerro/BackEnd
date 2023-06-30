import { Router } from "express";
import { userModel } from "../persistencia/models/Users.js";
import { hashData, compareData } from "../path.js";
import Passport from "passport";
const UserRouter = Router();

UserRouter.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.redirect("/api/products");
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

// //^login sin passpoert
// UserRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email });
//   if (!user) {
//     return res.redirect("/api/errorLogin"); 
//   }
//   const isPasswordValid = await compareData(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(400).json({ message: "Email or password not valid" });
//   }
//   req.session.user = user;
//   //req.session.email = email
//   //req.session.password = password
//   res.redirect("/api/profile");
// });

//^login con passpoert
UserRouter.post(
  "/login",
  Passport.authenticate("login", {
    passReqToCallback: true,
    failureRedirect: "/api/errorLogin",
    successRedirect: "/api/profile",
  })
);

//github
UserRouter.get(
  "/auth/github",
  Passport.authenticate("github", { scope: ["user:email"] })
);

UserRouter.get(
  "/auth/github/callback",
  Passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default UserRouter;
