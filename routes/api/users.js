const express = require("express");

const { controllerWrapper, authenticate } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));
router.patch(
  "/current",
  authenticate,
  controllerWrapper(ctrl.updateSubscription)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

module.exports = router;
