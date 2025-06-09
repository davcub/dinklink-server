import { Request, Response } from "express";
import getCourtsService, {
  GetCourtsServiceResponse,
} from "../services/getCourtsService";

const getCourtsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response: GetCourtsServiceResponse = await getCourtsService();
    res.status(200).json(response);
  } catch (e: unknown) {
    const error = e as Error;
    res.status(500).json({ courts: [], error: error.message });
  }
};

export default getCourtsController;

/**
 * @swagger
 * /courts:
 *   get:
 *     summary: Get list of courts
 *     tags:
 *       - Courts
 *     responses:
 *       200:
 *         description: Successful retrieval of courts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCourtsServiceResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courts:
 *                   type: array
 *                   items: {}
 *                   example: []
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
