export interface GetPlayersServiceResponse {
  players: Player[];
  error: string | null;
}

interface Player {
  id: string;
  name: string;
}

const getPlayersService = async (): Promise<GetPlayersServiceResponse> => {
  try {
    return {
      players: [],
      error: null,
    };
  } catch (e: unknown) {
    const error = e as Error;
    return {
      players: [],
      error: error.message,
    };
  }
};

export default getPlayersService;

/**
 * @swagger
 * components:
 *   schemas:
 *     GetPlayersServiceResponse:
 *       type: object
 *       properties:
 *         players:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Player'
 *           description: List of players retrieved from the service.
 *         error:
 *           type: string
 *           nullable: true
 *           example: null
 *           description: Error message if retrieval failed, otherwise null.
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "12345"
 *           description: Unique identifier for the player.
 *         name:
 *           type: string
 *           example: "John Doe"
 *           description: Name of the player.
 */
