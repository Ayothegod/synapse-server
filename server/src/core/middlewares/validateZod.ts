// middleware/validate.ts
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./ApiResponse.js";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.flatten();

      const flatMessages = Object.entries(formatted.fieldErrors).flatMap(
        ([field, messages]) => messages?.map((msg) => ({ field, message: msg }))
      );

      // console.log(flatMessages);

      res
        .status(400)
        .json(
          new ApiResponse(
            404,
            { errors: flatMessages },
            "Validation failed"
          )
        );

      return;
    }
    req.body = result.data;
    next();
  };