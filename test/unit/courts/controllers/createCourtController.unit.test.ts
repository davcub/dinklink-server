import { Request, Response } from "express";
import createCourtController from "../../../../src/courts/controllers/createCourtController";
import createCourtService from "../../../../src/courts/services/createCourtService";

jest.mock("../../../../src/courts/services/createCourtService");
const mockCreateCourtService = createCourtService as jest.MockedFunction<
  typeof createCourtService
>;

describe("createCourtController", () => {
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

  it("should call service and return 201 with response on success", async () => {
    req.body = {
      name: "Court X",
      num_courts: 2,
      address: "123 Main St",
      player_id: "player1",
    };
    mockCreateCourtService.mockResolvedValue({ message: "ok", error: null });
    await createCourtController(req as Request, res as Response);
    expect(mockCreateCourtService).toHaveBeenCalledWith(
      "Court X",
      2,
      "123 Main St",
      "player1",
    );
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: "ok", error: null });
  });

  it("should use default values for missing optional fields", async () => {
    req.body = {
      name: "Court Y",
      address: "456 Park Ave",
    };
    mockCreateCourtService.mockResolvedValue({ message: "ok", error: null });
    await createCourtController(req as Request, res as Response);
    expect(mockCreateCourtService).toHaveBeenCalledWith(
      "Court Y",
      1,
      "456 Park Ave",
      null,
    );
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: "ok", error: null });
  });

  it("should return 500 and error message if service throws", async () => {
    req.body = {
      name: "Court Z",
      address: "789 Elm St",
    };
    mockCreateCourtService.mockRejectedValue(new Error("fail"));
    await createCourtController(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: null, error: "fail" });
  });
});
