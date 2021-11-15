const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiBalanceSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validation(joiBalanceSchema),
  controllerWrapper(ctrl.updateBalance)
);

router.get("/", controllerWrapper(ctrl.getBalance));

module.exports = router;
