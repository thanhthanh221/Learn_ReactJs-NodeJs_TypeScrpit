import { HttpException } from "@core/exceptions";
import { logger } from "@core/utils";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || 500;
    const message: string = error.message || "Hệ thống đang lỗi !";

    logger.error(`[ERROR] - Status: ${status} - Msg: ${message}`);
    res.status(status).json({ message: message })
}

export default errorMiddleware;