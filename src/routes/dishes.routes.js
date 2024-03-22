const { Router } = require("express");
const multer = require("multer");

const DishesController = require("../controllers/dishes-controller");
const DishPictureController = require("../controllers/dish-picture-cotnroller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const verifyUserAuthorization = require("../middlewares/verify-user-authorization");

const uploadConfig = require("../configs/upload");

const dishesRoutes = Router();
const dishesController = new DishesController();
const dishPictureController = new DishPictureController();

const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);

dishesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  dishesController.create,
);

dishesRoutes.put(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishesController.update,
);

dishesRoutes.patch(
  "/:id/picture",
  verifyUserAuthorization(["admin"]),
  upload.single("picture"),
  dishPictureController.update,
);

dishesRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishesController.delete,
);

module.exports = dishesRoutes;
