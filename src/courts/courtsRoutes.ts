import { Router } from "express";
import getCourtsController from "./controllers/getCourtsController";

/**
 * @swagger
 * tags:
 *   name: courts
 *   description: Endpoints in courts module
 */

const courtsRoutes = Router();

courtsRoutes.get("/v1/courts", getCourtsController);
courtsRoutes.put("/v1/courts", getCourtsController);

export default courtsRoutes;
