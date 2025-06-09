import { Request, Response } from "express";
import getCourtsService, {
  GetCourtsServiceResponse,
} from "../services/getCourtsService";

type GetCourtsRequest = {
  lat?: number | null;
  lng?: number | null;
  page?: number;
  limit?: number;
  radius?: number;
};

const getCourtsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { lat, lng, page, limit, radius } = req.body as GetCourtsRequest;

    const response: GetCourtsServiceResponse = await getCourtsService(
      lat ?? null,
      lng ?? null,
      page ?? 0,
      limit ?? 10,
      radius ?? 10,
    );

    if (response.error) {
      throw new Error(response.error);
    }

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
 *   post:
 *     summary: Get list of courts
 *     tags:
 *       - Courts
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *                 nullable: true
 *                 description: Latitude for location-based search
 *                 example: 40.7128
 *               lng:
 *                 type: number
 *                 nullable: true
 *                 description: Longitude for location-based search
 *                 example: -74.0060
 *               page:
 *                 type: integer
 *                 description: Page number for pagination (0-based)
 *                 example: 0
 *               limit:
 *                 type: integer
 *                 description: Number of results per page
 *                 example: 10
 *               radius:
 *                 type: integer
 *                 description: Search radius in miles
 *                 example: 10
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
