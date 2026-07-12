import express, {NextFunction, Request, Response} from "express";
import {AppError} from "../exception/AppError";

export function selectValidator(
    req: Request,
    res: Response,
    next: NextFunction
) : void {
    const { slotId } = req.body;

    if (slotId  === undefined) {
        throw new AppError(
            "id is required",
            400
        );
    }


    if (typeof slotId  !== "number") {
        throw new AppError(
            "id must be a number",
            400
        );
    }


    if (slotId  <= 0) {
        throw new AppError(
            "id must be positive",
            400
        );
    }


    next();
}