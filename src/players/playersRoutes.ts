import { Router } from "express";
import getPlayersController from "./controllers/getPlayersController";
import getPlayerDetailsController from "./controllers/getPlayerDetailsController";

/**
 * @swagger
 * tags:
 *   name: players
 *   description: Endpoints in players module
 */

const playersRoutes = Router();

playersRoutes.get("/v1/players", getPlayersController);
playersRoutes.get("/v1/player/details", getPlayerDetailsController);

export default playersRoutes;
