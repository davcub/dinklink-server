import { Request, Response } from "express";
import getPlayersService, {
  GetPlayersServiceResponse,
} from "../services/getPlayersService";

const getPlayersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response: GetPlayersServiceResponse = await getPlayersService();
    res.status(200).json(response);
  } catch (e: unknown) {
    const error = e as Error;
    res.status(500).json({ players: [], error: error.message });
  }
};

export default getPlayersController;

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get list of players
 *     tags:
 *       - Players
 *     responses:
 *       200:
 *         description: Successful retrieval of players
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetPlayersServiceResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 players:
 *                   type: array
 *                   items: {}
 *                   example: []
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
