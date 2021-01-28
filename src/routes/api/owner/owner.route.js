
import express from "express";
import ownerController from "../../../controllers/businessOwner/businessOwnerController";
import authMiddleware from "../../../middlewares/emailUsername.js";
import businessOwnerValidator from "../../../validation/businessownerValidation"
import passport from "passport";
const { checkOwnerEmail,checkOwnerUsername } = authMiddleware;
import AuthControllers from "../../../controllers//businessOwner/socialMedia.controller";
import resetController from "../../../controllers//businessOwner/reset.owner.controller"
import subscribeController from "../../../controllers//businessOwner/subscriptionController"
import {upload} from '../../../utils/multer';
import profileController from "../../../controllers//businessOwner/owner.profile.controller"
import authentication from "../../../middlewares/authentication"
import authorization from '../../../middlewares/userAuthorization';

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.put("/", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/signup",businessOwnerValidator.signup,[checkOwnerEmail,checkOwnerUsername],ownerController.signup);
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

router.get("/profile/me",authentication,profileController.me)

router.patch("/update/profile",authentication,upload.single('profilePicture'),profileController.editProfile)
router.get("/view/profile/:id",authorization.userAuthorize,profileController.viewProfile)
router.get("/profile/me",authentication,profileController.me)
router.get("/profile/all",authorization.userAuthorize, profileController.allProfile)
router.post("/profile/rememberMe/:state",authentication,profileController.rememberProfile)

router.post("/change_password",authentication,businessOwnerValidator.changePasswordTemplate,profileController.changePassword)
router.post("/forgot_password",businessOwnerValidator.emailVerify,resetController.forgetPassword)
router.post("/reset_password/:token",businessOwnerValidator.passwordTemplate,resetController.resetPassword)
router.get("/subscribe",subscribeController.subscribe)
router.get("/unsubscribe",subscribeController.unsubscribe)


export default router;
