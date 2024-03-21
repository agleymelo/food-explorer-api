const { Router } = require("express");

const DishsController = require("../controllers/dishs-controller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const verifyUserAuthorization = require("../middlewares/verify-user-authorization");

const dishsRoutes = Router();
const dishsController = new DishsController();

dishsRoutes.use(ensureAuthenticated);

dishsRoutes.get("/", dishsController.index);
dishsRoutes.get("/:id", dishsController.show);

dishsRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  dishsController.create,
);

dishsRoutes.put(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishsController.update,
);

dishsRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishsController.delete,
);

module.exports = dishsRoutes;
