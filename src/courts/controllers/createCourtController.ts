import { Request, Response } from "express";
import createCourtService, {
  CreateCourtServiceResponse,
} from "../services/createCourtService";

type CreateCourtRequest = {
  name: string;
  num_courts?: number;
  address: string;
  player_id?: string | null;
};

const createCourtController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, num_courts, address, player_id } =
      req.body as CreateCourtRequest;
    const response: CreateCourtServiceResponse = await createCourtService(
      name,
      num_courts ?? 1,
      address,
      player_id ?? null,
    );
    res.status(201).json(response);
  } catch (e: unknown) {
    const error = e as Error;
    res.status(500).json({ message: null, error: error.message });
  }
};

export default createCourtController;

/**
 * @swagger
 * /courts:
 *   put:
 *     summary: Create a new court
 *     tags:
 *       - Courts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the court
 *                 example: Central Park Court
 *               num_courts:
 *                 type: integer
 *                 description: Number of courts at the location
 *                 example: 4
 *               address:
 *                 type: string
 *                 description: Address of the court
 *                 example: 123 Main St, City, State
 *               player_id:
 *                 type: string
 *                 nullable: true
 *                 description: ID of the player creating the court (optional)
 *                 example: player_123
 *     responses:
 *       201:
 *         description: Successful court creation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCourtServiceResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
