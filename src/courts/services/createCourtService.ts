export interface CreateCourtServiceResponse {
  message: string | null;
  error: string | null;
}

const createCourtService = async (): Promise<CreateCourtServiceResponse> => {
  try {
    return {
      message: "Court created successfully",
      error: null,
    };
  } catch (e: unknown) {
    const error = e as Error;
    return {
      message: null,
      error: error.message,
    };
  }
};

export default createCourtService;

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCourtServiceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           nullable: true
 *           example: Court created successfully
 *           description: A message describing the result of the court creation attempt. Null if there was an error.
 *         error:
 *           type: string
 *           nullable: true
 *           example: null
 *           description: Error message if court creation failed, otherwise null.
 */
