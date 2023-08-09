const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { userModel } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(userModel.schemas.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(userModel.schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(userModel.schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.patch(
  "/:userId/subscription",
  authenticate,
  validateBody(userModel.schemas.updateSubscriptionSchema),
  ctrl.updateSubscriptionUser
);

module.exports = router;
