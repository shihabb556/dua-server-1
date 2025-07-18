import db from "../db/config";
import { Request, Response, NextFunction } from "express";

// Get all categories
// GET /api/categories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await db.prepare("SELECT * FROM category").all();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

//get subcategories by category id
// GET /api/categories/:id/subcategories
export const getSubcategoriesByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const subcategories = await db.prepare("SELECT * FROM subcategory WHERE category_id = ?").all(id);
        res.status(200).json(subcategories);
    } catch (error) {
        next(error);
    }
};