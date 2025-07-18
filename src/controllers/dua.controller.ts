import { Request, Response, NextFunction } from "express";
import db from "../db/config";


//get all duas
// GET /api/duas
export const getDuas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const duas = await db.prepare("SELECT * FROM dua").all();
        res.status(200).json(duas);
    } catch (error) {
        next(error);
    }
};

//get dua by id
// GET /api/duas/:id
export const getDuaById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const dua = await db.prepare("SELECT * FROM dua WHERE id = ?").all(id);
        res.status(200).json(dua);
    } catch (error) {
        next(error);
    }
};

//get duas by category id
// GET /api/duas/category/:id
export const getDuasByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const duas = await db.prepare("SELECT * FROM dua WHERE category_id = ?").all(id);
        res.status(200).json(duas);
    } catch (error) {
        next(error);
    }
};

//get duas by subcategory id
// GET /api/duas/subcategory/:id
export const getDuasBySubcategoryId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const duas = await db.prepare("SELECT * FROM dua WHERE subcategory_id = ?").all(id);
        res.status(200).json(duas);
    } catch (error) {
        next(error);
    }
};