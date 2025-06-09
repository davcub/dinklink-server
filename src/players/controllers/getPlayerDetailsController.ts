import { Request, Response } from "express";
import getPlayerDetailsService, {
  GetPlayerDetailsResponse,
} from "../services/getPlayerDetailsService";

const getPlayerDetailsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response: GetPlayerDetailsResponse = await getPlayerDetailsService();
    res.status(200).json(response);
  } catch (e: unknown) {
    const error = e as Error;
    res.status(500).json({ player: null, error: error.message });
  }
};

export default getPlayerDetailsController;

/**
 * @swagger
 * /player/details:
 *   get:
 *     summary: Get player detail
 *     tags:
 *       - Players
 *     responses:
 *       200:
 *         description: Successful retrieval of player detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetPlayerDetailsResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 player:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
