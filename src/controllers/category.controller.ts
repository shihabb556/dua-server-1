import db from "../db/config";
import { Request, Response, NextFunction } from "express";

// Get all categories
// GET /api/categories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await db.prepare("SELECT * FROM category").all();
        if(!categories){
            return res.status(404).json({
                success: false,
                message: "Categories not found"
            })
        }
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        next(error);
    }
};

//get category by id
// GET /api/categories/:id
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const category = await db.prepare("SELECT * FROM category WHERE id = ?").get(id);
        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

//get subcategories by category id
// GET /api/categories/:id/subcategories
export const getSubcategoriesByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const subcategories = await db.prepare("SELECT * FROM sub_category WHERE cat_id = ?").all(id);
        if(!subcategories){
            return res.status(404).json({
                success: false,
                message: "sub_categories not found"
            })
        }
        res.status(200).json(subcategories);
    } catch (error) {
        next(error);
    }
};