import { Request, Response } from "express";
import getCourtsController from "../../../../src/courts/controllers/getCourtsController";
import getCourtsService from "../../../../src/courts/services/getCourtsService";

jest.mock("../../../../src/courts/services/getCourtsService");
const mockGetCourtsService = getCourtsService as jest.MockedFunction<
  typeof getCourtsService
>;

describe("getCourtsController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = { body: {} };
    res = { status: statusMock, json: jsonMock };
    jest.clearAllMocks();
  });

  it("should call service and return 200 with response on success", async () => {
    req.body = {
      lat: 40.7128,
      lng: -74.006,
      page: 1,
      limit: 5,
      radius: 10,
    };
    mockGetCourtsService.mockResolvedValue({
      courts: [
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
      ],
      total: 1,
      error: null,
    });
    await getCourtsController(req as Request, res as Response);
    expect(mockGetCourtsService).toHaveBeenCalledWith(
      40.7128,
      -74.006,
      1,
      5,
      10,
    );
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      courts: [
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
      ],
      total: 1,
      error: null,
    });
  });

  it("should use default values for missing optional fields", async () => {
    req.body = {};
    mockGetCourtsService.mockResolvedValue({
      courts: [],
      total: 0,
      error: null,
    });
    await getCourtsController(req as Request, res as Response);
    expect(mockGetCourtsService).toHaveBeenCalledWith(null, null, 0, 10, 10);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      courts: [],
      total: 0,
      error: null,
    });
  });

  it("should return 500 and error message if service returns error", async () => {
    req.body = { lat: 1, lng: 2 };
    mockGetCourtsService.mockResolvedValue({
      courts: [],
      total: 0,
      error: "fail",
    });
    await getCourtsController(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      courts: [],
      error: "fail",
    });
  });

  it("should return 500 and error message if service throws", async () => {
    req.body = { lat: 1, lng: 2 };
    mockGetCourtsService.mockRejectedValue(new Error("fail2"));
    await getCourtsController(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      courts: [],
      error: "fail2",
    });
  });
});
