import { ApiResponse } from "@/types/api.types";
import db from "../db/config";
import { Request, Response, NextFunction } from "express";
import { Category, SubCategory } from "../types";

// Get all categories
// GET /api/categories
export const getCategories = async (req: Request, res: Response<ApiResponse<Category[]>>, next: NextFunction) => {
    try {
        const categories = await db.prepare("SELECT * FROM category").get() as Category[];
        
        if(!categories){
            return res.status(404).json({
                success: false,
                message: "Categories not found",
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: "Categories Found",
            data:categories
        });
    } catch (error) {
        next(error);
    }
};

//get category by id
// GET /api/categories/:id
export const getCategoryById = async (req: Request, res: Response<ApiResponse<Category>>, next: NextFunction) => {
    const { id } = req.params;
    try {
        const category: Category = await db.prepare("SELECT * FROM category WHERE id = ?").get(id) as Category;
        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category not found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "Category found",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

//get subcategories by category id
// GET /api/categories/:id/subcategories
export const getSubcategoriesByCategoryId = async (req: Request, res: Response<ApiResponse<SubCategory[]>>, next: NextFunction) => {
    const { id } = req.params;
    try {
        const subcategories: SubCategory[] = await db.prepare("SELECT * FROM sub_category WHERE cat_id = ?").get(id) as SubCategory[];

        if(!subcategories){
            return res.status(404).json({
                success: false,
                message: "sub_categories not found",
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: "sub_categories found",
            data:subcategories,
        });
    } catch (error) {
        next(error);
    }
};