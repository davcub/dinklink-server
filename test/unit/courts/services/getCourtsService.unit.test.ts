import getCourtsService, {
  GetCourtsServiceResponse,
} from "../../../../src/courts/services/getCourtsService";
import pgPool from "../../../../src/utils/pgPool";

interface MockCourt {
  court_id: string;
  name: string;
  address: string;
  num_courts: number;
  lat: number;
  lng: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

interface PgPoolQueryResult {
  rows: MockCourt[];
}

jest.mock("../../../../src/utils/pgPool");
const mockedPgPool = pgPool as unknown as { query: jest.Mock };

describe("getCourtsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns courts when lat/lng are null (all courts)", async () => {
    const mockRows: MockCourt[] = [
      {
        court_id: "1",
        name: "Court 1",
        address: "123 Main St",
        num_courts: 2,
        lat: 1.1,
        lng: 2.2,
        created_by: "Alice",
        created_at: "2025-06-09T12:00:00Z",
        updated_by: "Bob",
        updated_at: "2025-06-10T12:00:00Z",
      },
    ];
    mockedPgPool.query
      .mockResolvedValueOnce({ rows: mockRows } as PgPoolQueryResult) // courts query
      .mockResolvedValueOnce({ rows: [{ total: 1 }] }); // count query
    const result: GetCourtsServiceResponse = await getCourtsService();
    expect(result).toEqual({ courts: mockRows, total: 1, error: null });
    expect(mockedPgPool.query).toHaveBeenCalledWith(
      expect.any(String),
      [10, 0],
    );
    expect(mockedPgPool.query).toHaveBeenCalledWith(expect.any(String), []);
  });

  it("returns courts when lat/lng are provided (location search)", async () => {
    const mockRows: MockCourt[] = [
      {
        court_id: "2",
        name: "Court 2",
        address: "456 Park Ave",
        num_courts: 4,
        lat: 3.3,
        lng: 4.4,
        created_by: "Carol",
        created_at: "2025-06-09T13:00:00Z",
        updated_by: "Dave",
        updated_at: "2025-06-10T13:00:00Z",
      },
    ];
    mockedPgPool.query
      .mockResolvedValueOnce({ rows: mockRows } as PgPoolQueryResult) // courts query
      .mockResolvedValueOnce({ rows: [{ total: 1 }] }); // count query
    const result: GetCourtsServiceResponse = await getCourtsService(
      40,
      -74,
      1,
      5,
      20,
    );
    expect(result).toEqual({ courts: mockRows, total: 1, error: null });
    expect(mockedPgPool.query).toHaveBeenCalledWith(
      expect.any(String),
      [40, -74, 20, 5, 5],
    );
    expect(mockedPgPool.query).toHaveBeenCalledWith(
      expect.any(String),
      [40, -74, 20],
    );
  });

  it("returns error when pgPool.query throws", async () => {
    mockedPgPool.query.mockRejectedValueOnce(new Error("DB error"));
    const result: GetCourtsServiceResponse = await getCourtsService();
    expect(result).toEqual({ courts: [], total: 0, error: "DB error" });
  });
});
