const express = require("express");
const {
  principalView,
  tablesView,
  notificationsViews,
} = require("../controllers/PageControllers");

const router = express.Router();

router.get("/", principalView);
router.get("/tables", tablesView);
router.get("/notifications", notificationsViews);

module.exports = { routes: router };
