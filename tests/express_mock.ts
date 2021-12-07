import { Response, NextFunction } from 'express'

export const generateMockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

export const generateMockNext = () : NextFunction => {
    return jest.fn();
}