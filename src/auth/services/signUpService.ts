export interface SignUpServiceResponse {
  message: string | null;
  error: string | null;
}

const signUpService = async (): Promise<SignUpServiceResponse> => {
  try {
    return {
      message: "Sign up successful",
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

export default signUpService;

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpServiceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           nullable: true
 *           example: Sign up successful
 *           description: A message describing the result of the sign up attempt. Null if there was an error.
 *         error:
 *           type: string
 *           nullable: true
 *           example: null
 *           description: Error message if sign up failed, otherwise null.
 */
