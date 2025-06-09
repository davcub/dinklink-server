import createCourtService from "../../../../src/courts/services/createCourtService";
import pgPool from "../../../../src/utils/pgPool";
import geocodeService from "../../../../src/courts/services/geocodeService";

jest.mock("../../../../src/utils/pgPool");
jest.mock("../../../../src/courts/services/geocodeService");

const mockPgPool = pgPool as jest.Mocked<typeof pgPool>;
const mockGeocodeService = geocodeService as jest.MockedFunction<
  typeof geocodeService
>;

describe("createCourtService", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    (mockPgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("creates a court successfully", async () => {
    mockGeocodeService.mockResolvedValue({ lat: 1.23, lng: 4.56 });
    mockClient.query.mockResolvedValue(undefined);
    const result = await createCourtService(
      "Court A",
      2,
      "123 Main St",
      "player1",
    );
    expect(mockPgPool.connect).toHaveBeenCalled();
    expect(mockClient.query).toHaveBeenCalledWith("BEGIN");
    expect(mockClient.query).toHaveBeenCalledWith(expect.any(String), [
      "Court A",
      "123 Main St",
      2,
      1.23,
      4.56,
      "player1",
    ]);
    expect(mockClient.query).toHaveBeenCalledWith("COMMIT");
    expect(mockClient.release).toHaveBeenCalled();
    expect(result).toEqual({
      message: "Court A created successfully",
      error: null,
    });
  });

  it("creates a court successfully even when num courts is null and player_id is null", async () => {
    mockGeocodeService.mockResolvedValue({ lat: 1.23, lng: 4.56 });
    mockClient.query.mockResolvedValue(undefined);
    const result = await createCourtService(
      "Court A",
      null,
      "123 Main St",
      null,
    );
    expect(mockPgPool.connect).toHaveBeenCalled();
    expect(mockClient.query).toHaveBeenCalledWith("BEGIN");
    expect(mockClient.query).toHaveBeenCalledWith(expect.any(String), [
      "Court A",
      "123 Main St",
      1,
      1.23,
      4.56,
      null,
    ]);
    expect(mockClient.query).toHaveBeenCalledWith("COMMIT");
    expect(mockClient.release).toHaveBeenCalled();
    expect(result).toEqual({
      message: "Court A created successfully",
      error: null,
    });
  });

  it("rolls back and returns error if address is missing", async () => {
    const result = await createCourtService("Court B", 1, "", "player2");
    expect(mockClient.query).toHaveBeenCalledWith("ROLLBACK");
    expect(mockClient.release).toHaveBeenCalled();
    expect(result).toEqual({ message: null, error: "Address is required" });
  });

  it("rolls back and returns error if geocoding fails", async () => {
    mockGeocodeService.mockResolvedValue({ lat: null, lng: null });
    const result = await createCourtService(
      "Court C",
      null,
      "456 Park Ave",
      "player3",
    );
    expect(mockClient.query).toHaveBeenCalledWith("ROLLBACK");
    expect(mockClient.release).toHaveBeenCalled();
    expect(result).toEqual({
      message: null,
      error: "Geocoding failed for the provided address",
    });
  });

  it("rolls back and returns error if DB throws during insert", async () => {
    mockGeocodeService.mockResolvedValue({ lat: 7.89, lng: 0.12 });
    mockClient.query
      .mockImplementationOnce(() => Promise.resolve()) // BEGIN
      .mockImplementationOnce(() => {
        throw new Error("DB error");
      });
    const result = await createCourtService(
      "Court D",
      3,
      "789 Elm St",
      "player4",
    );
    expect(mockClient.query).toHaveBeenCalledWith("ROLLBACK");
    expect(mockClient.release).toHaveBeenCalled();
    expect(result).toEqual({ message: null, error: "DB error" });
  });
});
