import type { NextFunction, Response } from "express";

export const generateMockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const generateMockNext = (): NextFunction => jest.fn();
