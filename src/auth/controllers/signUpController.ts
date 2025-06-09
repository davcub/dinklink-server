import { Request, Response } from "express";
import signUpService, {
  SignUpServiceResponse,
} from "../services/signUpService";

const signUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const response: SignUpServiceResponse = await signUpService();
    res.status(201).json(response);
  } catch (e: unknown) {
    const error = e as Error;
    res.status(500).json({ message: null, error: error.message });
  }
};

export default signUpController;

/**
 * @swagger
 * /sign_up:
 *   post:
 *     summary: User sign up
 *     tags:
 *       - Auth
 *     responses:
 *       201:
 *         description: Successful sign up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpServiceResponse'
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
