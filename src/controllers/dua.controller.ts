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

        if (!dua) {
            return res.status(404).json({ message: "Dua not found" });
          }

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
        const category = await db.prepare("SELECT 1 FROM category WHERE cat_id = ?").get(id);

        if (!category) {
          return res.status(404).json({ message: `Category: ${id} does not exist`});
        }

        const duas = await db.prepare("SELECT * FROM dua WHERE cat_id = ?").all(id);

        if(!duas){
            return res.status(404).json({
                message: "Duas not found for this category:",id
            })
        }

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

        const subcategory = await db.prepare("SELECT 1 FROM sub_category WHERE subcat_id = ?").get(id);

        if (!subcategory) {
          return res.status(404).json({ message: `Subcategory: ${id}  does not exist`});
        }

        const duas = await db.prepare("SELECT * FROM dua WHERE subcat_id = ?").all(id);

        if(!duas){
            return res.status(404).json({
                message: "Duas not found for this sub_category id:", id
            })
        }

        res.status(200).json(duas);
    } catch (error) {
        next(error);
    }
};