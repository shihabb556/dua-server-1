import { Request, Response, NextFunction } from "express";
import db from "../db/config";
import { ApiResponse } from "@/types/api.types";
import { Category, Dua } from "@/types";


//get all duas
// GET /api/duas
export const getDuas = async (req: Request, res: Response<ApiResponse<Dua[]>>, next: NextFunction) => {
    try {
        const duas: Dua[] = await db.prepare("SELECT * FROM dua").get() as Dua[];

        if(!duas){
            return res.status(404).json({
                success:false,
                message: "Duas not found",
                data: []
            })
        }
      
        res.status(200).json({
            success:false,
            message: "Duas found",
            data: duas
        });
    } catch (error) {
        next(error);
    }
};

//get dua by id
// GET /api/duas/:id
export const getDuaById = async (req: Request, res: Response<ApiResponse<Dua>>, next: NextFunction) => {
    const { id } = req.params;
    try {
        const dua: Dua = await db.prepare("SELECT * FROM dua WHERE id = ?").get(id) as Dua;

        if (!dua) {
            return res.status(404).json({
                 success:false,
                 message: "Dua not found" ,
                data: null
                });
          }

        res.status(200).json({
            success:true,
            message: "Dua found",
            data: dua
        });
    } catch (error) {
        next(error);
    }
};

//get duas by category id
// GET /api/duas/category/:id
export const getDuasByCategoryId = async (req: Request, res: Response<ApiResponse<Dua[]>>, next: NextFunction) => {
    const { id } = req.params;
    try {
        const category: Category = await db.prepare("SELECT 1 FROM category WHERE cat_id = ?").get(id) as Category;

        if (!category) {
          return res.status(404).json({ success: false, message: `Category: ${id} does not exist`, data: null});
        }

        const duas: Dua[] = await db.prepare("SELECT * FROM dua WHERE cat_id = ?").get(id) as Dua[];

        if(!duas){
            return res.status(404).json({
                success:false,
                message: `Duas not found for this category: ${id}`,
                data: []
            })
        }

        res.status(200).json({
            success: true,
            message: "Duas found",
            data:duas
        });
    } catch (error) {
        next(error);
    }
};

//get duas by subcategory id
// GET /api/duas/subcategory/:id
export const getDuasBySubcategoryId = async (req: Request, res: Response<ApiResponse<Dua[]>>, next: NextFunction) => {
    const { id } = req.params;
    try {

        const subcategory = await db.prepare("SELECT 1 FROM sub_category WHERE subcat_id = ?").get(id);

        if (!subcategory) {
          return res.status(404).json({ success:false,message: `Subcategory: ${id}  does not exist`, data: null});
        }

        const duas: Dua[] = await db.prepare("SELECT * FROM dua WHERE subcat_id = ?").get(id) as Dua[];

        if(!duas){
            return res.status(404).json({
                success: false,
                message: `Duas not found for this sub_category id: ${id}`,
                data: []
            })
        }

        res.status(200).json({
            success: true,
            message: "Duas Found",
            data:duas
        });
    } catch (error) {
        next(error);
    }
};