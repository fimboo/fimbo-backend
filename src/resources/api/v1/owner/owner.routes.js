
import express from "express";
import passport from "passport";

import ownerController from "./businessOwnerController";
// import authMiddleware from "../../../middlewares/emailUsername.js";
import businessOwnerValidator from "./businessownerValidation"
import AuthControllers from "../auth/socialMedia.controller";
import resetController from "../auth/reset.owner.controller"
import subscribeController from "./subscriptionController"
import profileController from "./profile/owner.profile.controller"
import CheckAuthorisation from "../../../../middlewares/authentication"

import {upload} from '../../../../utils/multer';
import BusinessOwnerController from "./businessOwnerController";

// const { checkOwnerEmail,checkOwnerUsername } = authMiddleware;
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/signup",businessOwnerValidator.signup,ownerController.signup);
router.post("/resend",businessOwnerValidator.emailVerify,ownerController.resend)
router.get("/confirmation/:token",ownerController.confirmation);
router.post("/login",businessOwnerValidator.login,ownerController.login)
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/redirect/",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/login/facebook/redirect/",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/api");
});

router.get("/profile/me",profileController.me)

router.put("/update/profile",CheckAuthorisation,upload.single('profilePicture'),profileController.editProfile)
// router.get("/view/profile/:id",profileController.viewProfile)
router.get("/profile/me",CheckAuthorisation,profileController.me)
// router.get("/profile/all", profileController.allProfile)
router.post("/profile/rememberMe/:state",CheckAuthorisation,profileController.rememberProfile)

router.post("/change_password",businessOwnerValidator.changePasswordTemplate,profileController.changePassword)
router.post("/forgot_password",businessOwnerValidator.emailVerify,BusinessOwnerController.forgetPassword)
router.post("/reset_password/:token",businessOwnerValidator.passwordTemplate,BusinessOwnerController.resetPassword)
router.get("/subscribe",subscribeController.subscribe)
router.get("/unsubscribe",subscribeController.unsubscribe)


export default router;
