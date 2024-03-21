const { Router } = require("express");

const CategoriesController = require("../controllers/categories-controller");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", categoriesController.create);

module.exports = categoriesRoutes;
