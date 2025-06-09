import pgPool from "../../utils/pgPool";
import {
  getCourtsByLocationCountQuery,
  getCourtsByLocationQuery,
  getCourtsCountQuery,
  getCourtsQuery,
} from "../repositories/getCourtsQueries";

export interface GetCourtsServiceResponse {
  courts: Court[];
  total: number;
  error: string | null;
}

interface Court {
  court_id: string;
  name: string;
  address: string;
  num_courts: number;
  lat: number;
  lng: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

const getCourtsService = async (
  lat: number | null = null,
  lng: number | null = null,
  page: number = 0,
  limit: number = 10,
  radius: number = 10,
): Promise<GetCourtsServiceResponse> => {
  try {
    const offSet: number = page * limit;

    let query: string = "";
    let params: number[] = [];
    let countQuery: string = "";
    let countParams: number[] = [];
    if (lat === null || lng === null) {
      query = getCourtsQuery;
      params = [limit, offSet];
      countQuery = getCourtsCountQuery;
    } else {
      query = getCourtsByLocationQuery;
      countQuery = getCourtsByLocationCountQuery;
      params = [lat, lng, radius, limit, offSet];
      countParams = [lat, lng, radius];
    }

    const courtsRes = await pgPool.query(query, params);
    const countRes = await pgPool.query(countQuery, countParams);

    const courts: Court[] = courtsRes.rows;
    const total: number = countRes.rows[0].total;

    return {
      courts,
      total,
      error: null,
    };
  } catch (e: unknown) {
    const error = e as Error;
    return {
      courts: [],
      total: 0,
      error: error.message,
    };
  }
};

export default getCourtsService;

/**
 * @swagger
 * components:
 *   schemas:
 *     Court:
 *       type: object
 *       properties:
 *         court_id:
 *           type: string
 *           description: Unique identifier for the court
 *           example: "court_123"
 *         name:
 *           type: string
 *           description: Name of the court
 *           example: "Central Park Court"
 *         address:
 *           type: string
 *           description: Address of the court
 *           example: "123 Main St, City, State"
 *         num_courts:
 *           type: integer
 *           description: Number of courts at the location
 *           example: 4
 *         lat:
 *           type: number
 *           description: Latitude coordinate
 *           example: 40.7128
 *         lng:
 *           type: number
 *           description: Longitude coordinate
 *           example: -74.0060
 *         created_by:
 *           type: string
 *           description: Name of the user who created the court
 *           example: "John Doe"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: "2024-06-09T12:00:00Z"
 *         updated_by:
 *           type: string
 *           description: Name of the user who last updated the court
 *           example: "Jane Smith"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: "2024-06-10T15:30:00Z"
 *     GetCourtsServiceResponse:
 *       type: object
 *       properties:
 *         courts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Court'
 *           description: List of courts
 *         total:
 *          type: integer
 *          description: Total number of courts available
 *          example: 100
 *         error:
 *           type: string
 *           nullable: true
 *           description: Error message if fetching courts failed, otherwise null
 *           example: null
 */
