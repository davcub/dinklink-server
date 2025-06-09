import awsLocationClient from "../../utils/awsLocationClient";
import {
  SearchPlaceIndexForTextCommand,
  SearchPlaceIndexForTextCommandOutput,
} from "@aws-sdk/client-location";
import { AWS_PLACE_INDEX } from "../../secret";

export interface GeocodeServiceResponse {
  lat: number | null;
  lng: number | null;
}

const geocodeService = async (
  address: string,
): Promise<GeocodeServiceResponse> => {
  try {
    if (!address) {
      throw new Error("Address is required");
    }

    const command = new SearchPlaceIndexForTextCommand({
      IndexName: AWS_PLACE_INDEX,
      Text: address,
      MaxResults: 1,
    });

    const response: SearchPlaceIndexForTextCommandOutput =
      await awsLocationClient.send(command);
    const result = response.Results && response.Results[0];
    const point = result?.Place?.Geometry?.Point;
    if (Array.isArray(point) && point.length === 2) {
      const [lng, lat] = point;
      return { lat, lng };
    }
    return { lat: null, lng: null };
  } catch {
    return {
      lat: null,
      lng: null,
    };
  }
};

export default geocodeService;
