import { Router } from "express";
import authRoutes from "./auth/authRoutes";
import courtsRoutes from "./courts/courtsRoutes";
import playersRoutes from "./players/playersRoutes";

const rootRouter: Router = Router();

rootRouter.use(authRoutes);
rootRouter.use(courtsRoutes);
rootRouter.use(playersRoutes);

export default rootRouter;
