const { Router } = require("express");

const CategoriesController = require("../controllers/categories-controller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const verifyUserAuthorization = require("../middlewares/verify-user-authorization");

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.get("/", categoriesController.index);

categoriesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  categoriesController.create,
);

module.exports = categoriesRoutes;
