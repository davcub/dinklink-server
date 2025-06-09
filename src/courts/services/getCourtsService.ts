export interface GetCourtsServiceResponse {
  courts: Court[];
  error: string | null;
}

interface Court {
  id: string;
  name: string;
}

const getCourtsService = async (): Promise<GetCourtsServiceResponse> => {
  try {
    return {
      courts: [],
      error: null,
    };
  } catch (e: unknown) {
    const error = e as Error;
    return {
      courts: [],
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
 *         id:
 *           type: string
 *           description: Unique identifier for the court
 *           example: "court_123"
 *         name:
 *           type: string
 *           description: Name of the court
 *           example: "Central Park Court"
 *     GetCourtsServiceResponse:
 *       type: object
 *       properties:
 *         courts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Court'
 *           description: List of courts
 *         error:
 *           type: string
 *           nullable: true
 *           description: Error message if fetching courts failed, otherwise null
 *           example: null
 */
