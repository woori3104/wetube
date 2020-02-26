
import passport from "passport";
import GithubStrategy from "passport-github";
import FaceBookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import routes from "./routes";
import { githubLoginCallback, kakaoLoginCallback, facebookLoginCallback } from "./controller/userController";


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
      callbackURL: `https://b49e3c11.ngrok.io${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope:['public_profile','email']
    },
    facebookLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `https://b49e3c11.ngrok.io${routes.kakaoCallback}`,
      
    },
    kakaoLoginCallback
  )
);



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());