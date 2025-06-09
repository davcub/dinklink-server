import { Router } from "express";
import getCourtsController from "./controllers/getCourtsController";
import createCourtController from "./controllers/createCourtController";

/**
 * @swagger
 * tags:
 *   name: courts
 *   description: Endpoints in courts module
 */

const courtsRoutes = Router();

courtsRoutes.post("/v1/courts", getCourtsController);
courtsRoutes.put("/v1/courts", createCourtController);

export default courtsRoutes;
