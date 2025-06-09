export interface SignInServiceResponse {
  message: string | null;
  error: string | null;
}

const signInService = async (): Promise<SignInServiceResponse> => {
  try {
    return {
      message: "Sign in successful",
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

export default signInService;

/**
 * @swagger
 * components:
 *   schemas:
 *     SignInServiceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           nullable: true
 *           example: Sign in successful
 *           description: A message describing the result of the sign in attempt. Null if there was an error.
 *         error:
 *           type: string
 *           nullable: true
 *           example: null
 *           description: Error message if sign in failed, otherwise null.
 */
