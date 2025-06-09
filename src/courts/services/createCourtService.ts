import pgPool from "../../utils/pgPool";
import { createCourtQuery } from "../repositories/createCourtQueries";
import geocodeService, { GeocodeServiceResponse } from "./geocodeService";

export interface CreateCourtServiceResponse {
  message: string | null;
  error: string | null;
}

const createCourtService = async (
  name: string,
  num_courts: number | null,
  address: string,
  player_id: string | null,
): Promise<CreateCourtServiceResponse> => {
  const client = await pgPool.connect();
  try {
    if (!address) {
      throw new Error("Address is required");
    }

    const geocodeResult: GeocodeServiceResponse = await geocodeService(address);

    if (geocodeResult.lat === null || geocodeResult.lng === null) {
      throw new Error("Geocoding failed for the provided address");
    }

    await client.query("BEGIN");
    await client.query(createCourtQuery, [
      name,
      address,
      num_courts || 1,
      geocodeResult.lat,
      geocodeResult.lng,
      player_id || null,
    ]);
    await client.query("COMMIT");

    return {
      message: `${name} created successfully`,
      error: null,
    };
  } catch (e: unknown) {
    await client.query("ROLLBACK");
    const error = e as Error;
    return {
      message: null,
      error: error.message,
    };
  } finally {
    client.release();
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
