import { Router } from "express";
import signInController from "./controllers/signInController";
import signUpController from "./controllers/signUpController";

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Endpoints in log in and sign up module
 */

const authRoutes = Router();

authRoutes.post("/v1/sign_in", signInController);
authRoutes.put("/v1/sign_up", signUpController);

export default authRoutes;
