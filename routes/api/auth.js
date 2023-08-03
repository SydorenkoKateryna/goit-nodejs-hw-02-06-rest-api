const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { userModel } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(userModel.schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(userModel.schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/:userId/subscription",
  authenticate,
  validateBody(userModel.schemas.updateSubscriptionSchema),
  ctrl.updateSubscriptionUser
);

module.exports = router;
