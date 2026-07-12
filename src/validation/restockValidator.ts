import {Request, Response, NextFunction} from "express";
import {AppError} from "../exception/AppError";

export function restockValidator(
    req: Request,
    res: Response,
    next: NextFunction
) : void {
    const id = req.body.id;
    const product = req.body.product;
    const price = req.body.price;
    const stock = req.body.stock;

    if (id === undefined ) {
        throw new AppError(
            "Id is required",
            400
        );
    }
    if (product === undefined ) {
        throw new AppError(
            "product is required",
            400
        );
    }
    if (price === undefined ) {
        throw new AppError(
            "price is required",
            400
        );
    }
    if (stock === undefined ) {
        throw new AppError(
            "Stock is required",
            400
        );
    }


    if (typeof id !== "number") {
        throw new AppError(
            "Id must be a number",
            400
        );
    }
    if (typeof price !== "number") {
        throw new AppError(
            "Price must be a number",
            400
        );
    }
    if (typeof product !== "string") {
        throw new AppError(
            "Product must be a str",
            400
        );
    }
    if (typeof stock !== "number") {
        throw new AppError(
            "Stock must be a number",
            400
        );
    }

    if (product.trim().length === 0) {
        throw new AppError(
            "Product cannot be empty",
            400
        );
    }

    if (price < 0) {
        throw new AppError(
            "Price must be greater than zero",
            400
        );
    }

    if (stock <= 0) {
        throw new AppError(
            "Stock cannot be negative",
            400
        );
    }

    if (id <= 0) {
        throw new AppError(
            "Id cannot be negative or zero",
            400
        );
    }

    next();
}