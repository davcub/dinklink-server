import { Request, Response } from "express";
import signInService, {
  SignInServiceResponse,
} from "../services/signInService";

const signInController = async (req: Request, res: Response): Promise<void> => {
  try {
    const response: SignInServiceResponse = await signInService();
    res.status(200).json(response);
  } catch (e: unknown) {
    const error = e as Error;
    res.status(500).json({ message: null, error: error.message });
  }
};

export default signInController;

/**
 * @swagger
 * /sign_in:
 *   post:
 *     summary: User sign in
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInServiceResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
