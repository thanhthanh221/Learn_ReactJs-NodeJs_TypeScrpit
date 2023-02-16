import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { logger } from '@core/utils';
import { HttpException } from "@core/exceptions";

const validationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(type, req.body), { skipMissingProperties })
            .then((error: ValidationError[]) => {
                if (error.length > 0) {
                    const message = error.map((error: ValidationError) => {
                        return Object.values(error.constraints!);
                    }).join(", ");
                    next(new HttpException(400, message));
                }
            });
    }
}

export default validationMiddleware