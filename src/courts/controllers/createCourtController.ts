import { Request, Response } from "express";
import createCourtService, {
  CreateCourtServiceResponse,
} from "../services/createCourtService";

const createCourtController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response: CreateCourtServiceResponse = await createCourtService();
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
