const { Router } = require("express");
const multer = require("multer");

const DishsController = require("../controllers/dishs-controller");
const DishPictureController = require("../controllers/dish-picture-cotnroller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const verifyUserAuthorization = require("../middlewares/verify-user-authorization");

const uploadConfig = require("../configs/upload");

const dishsRoutes = Router();
const dishsController = new DishsController();
const dishPictureController = new DishPictureController();

const upload = multer(uploadConfig.MULTER);

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

dishsRoutes.patch(
  "/:id/picture",
  verifyUserAuthorization(["admin"]),
  upload.single("picture"),
  dishPictureController.update,
);

dishsRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishsController.delete,
);

module.exports = dishsRoutes;
