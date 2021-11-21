const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/transaction");
const { userTransactions: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/statistic", authenticate, controllerWrapper(ctrl.getByFilter));

module.exports = router;
