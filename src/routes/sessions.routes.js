const { Router } = require("express");

const SessionController = require("../controllers/sessions-controller");

const sessionsRoutes = Router();
const sessionController = new SessionController();

sessionsRoutes.post("/", sessionController.create);

module.exports = sessionsRoutes;
