import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  console.log(`Estas haciendo una solicitud de tipo ${method} a ${url}`);
  next();
};
