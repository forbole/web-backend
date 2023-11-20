import type { NextFunction, Request, Response } from "express";
import { generateMockNext, generateMockResponse } from "tests/express_mock";

import { contact } from "./contact";

describe("Contact", function () {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = generateMockResponse();
    next = generateMockNext();
  });

  it("should respond", function () {
    contact(req as Request, res as Response, next);

    expect(res.json).toBeCalledWith({
      success: true,
    });
    expect(res.status).toBeCalledWith(200);
    expect(next).toBeCalledTimes(0);
  });
});
