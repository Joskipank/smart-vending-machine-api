
import {Request, Response, NextFunction} from "express";
import {AppError} from "../exception/AppError";

export function validateInsert(
    req: Request,
    res: Response,
    next: NextFunction
) : void {
    const amount = req.body.amount;


    if (amount === undefined) {
        throw new AppError(
            "Amount is required",
            400
        );
    }


    if (typeof amount !== "number") {
        throw new AppError(
            "Amount must be a number",
            400
        );
    }


    if (amount <= 0) {
        throw new AppError(
            "Amount must be positive",
            400
        );
    }

    next();
}