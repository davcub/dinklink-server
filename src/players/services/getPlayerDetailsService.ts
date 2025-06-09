export interface GetPlayerDetailsResponse {
  player: Player | null;
  error: string | null;
}

interface Player {
  id: string;
  name: string;
}

const getPlayerDetailsService = async (): Promise<GetPlayerDetailsResponse> => {
  try {
    return {
      player: {
        id: "12345",
        name: "John Doe",
      },
      error: null,
    };
  } catch (e: unknown) {
    const error = e as Error;
    return {
      player: null,
      error: error.message,
    };
  }
};

export default getPlayerDetailsService;

/**
 * @swagger
 * components:
 *   schemas:
 *     GetPlayerDetailsResponse:
 *       type: object
 *       properties:
 *         player:
 *           type: object
 *           nullable: true
 *           $ref: '#/components/schemas/Player'
 *           description: Player details retrieved from the service. Null if there was an error.
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
