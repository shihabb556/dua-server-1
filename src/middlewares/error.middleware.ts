import { NextFunction, Request, Response } from "express"


export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    })
};


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error in the middleware: ", err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        message
    })

};