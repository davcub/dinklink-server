import geocodeService from "../../../../src/courts/services/geocodeService";
import awsLocationClient from "../../../../src/utils/awsLocationClient";
import { SearchPlaceIndexForTextCommandOutput } from "@aws-sdk/client-location";

describe("geocodeService", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalSend: any;
  beforeAll(() => {
    originalSend = awsLocationClient.send;
  });
  afterEach(() => {
    awsLocationClient.send = originalSend;
    jest.clearAllMocks();
  });

  it("returns lat/lng for a valid address with a valid response", async () => {
    const mockResponse: Partial<SearchPlaceIndexForTextCommandOutput> = {
      Results: [
        {
          Place: {
            Geometry: {
              Point: [-74.006, 40.7128],
            },
          },
        },
      ],
      $metadata: {},
    };
    awsLocationClient.send = jest.fn().mockResolvedValueOnce(mockResponse);
    const result = await geocodeService("New York, NY");
    expect(result).toEqual({ lat: 40.7128, lng: -74.006 });
  });

  it("returns null lat/lng if address is not found (empty Results)", async () => {
    const mockResponse: Partial<SearchPlaceIndexForTextCommandOutput> = {
      Results: [],
      $metadata: {},
    };
    awsLocationClient.send = jest.fn().mockResolvedValueOnce(mockResponse);
    const result = await geocodeService("Unknown Place");
    expect(result).toEqual({ lat: null, lng: null });
  });

  it("returns null lat/lng if Point is missing", async () => {
    const mockResponse: Partial<SearchPlaceIndexForTextCommandOutput> = {
      Results: [
        {
          Place: {
            Geometry: {},
          },
        },
      ],
      $metadata: {},
    };
    awsLocationClient.send = jest.fn().mockResolvedValueOnce(mockResponse);
    const result = await geocodeService("No Point");
    expect(result).toEqual({ lat: null, lng: null });
  });

  it("throws error if address is empty", async () => {
    const result = await geocodeService("");
    expect(result).toEqual({ lat: null, lng: null });
  });

  it("returns null lat/lng if awsLocationClient.send throws", async () => {
    awsLocationClient.send = jest
      .fn()
      .mockRejectedValueOnce(new Error("AWS error"));
    const result = await geocodeService("New York, NY");
    expect(result).toEqual({ lat: null, lng: null });
  });
});
