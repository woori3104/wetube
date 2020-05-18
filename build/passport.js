"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _passportGoogle = _interopRequireDefault(require("passport-google"));

var _passportKakao = _interopRequireDefault(require("passport-kakao"));

var _User = _interopRequireDefault(require("./models/User"));

var _routes = _interopRequireDefault(require("./routes"));

var _userController = require("./controller/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "https://b49e3c11.ngrok.io".concat(_routes["default"].facebookCallback),
  profileFields: ["id", "displayName", "photos", "email"],
  scope: ['public_profile', 'email']
}, _userController.facebookLoginCallback));

_passport["default"].use(new _passportKakao["default"]({
  clientID: process.env.KAKAO_ID,
  clientSecret: process.env.KAKAO_SECRET,
  callbackURL: "https://b49e3c11.ngrok.io".concat(_routes["default"].kakaoCallback)
}, _userController.kakaoLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());