import { Request, Response } from "express";

export const Temp = async (_: Request, res: Response) => {
  return res.status(200).json({
    message: "Backend working",
    data: [],
  });
};
