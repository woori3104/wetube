
import passport from "passport";
import GithubStrategy from "passport-github";
import FaceBookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routes";
import { githubLoginCallback, kakaoLoginCallback, facebookLoginCallback } from "./controller/userController";

var kakaopassport = require('passport'),
  KakaoStrategy = require('passport-kakao').Strategy;
passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL:`http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FaceBookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
);

kakaopassport.use(
  new KakaoStrategy (
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());