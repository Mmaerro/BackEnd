import Passport from "passport";
import "dotenv/config";
import { userModel } from "./persistencia/models/Users.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { compareData } from "./path.js";

//^localstrategy
Passport.use(
  "login",
  new LocalStrategy(
    {
      usenameField: "email",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//^githubstrategy
Passport.use('github',new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  async()=>{
    try {
      
    } catch (error) {
      
    }
  }))

Passport.serializeUser(function (user, done) {
  done(null, user._id);
});

Passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
