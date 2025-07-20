import { ApiResponse } from "@/types/api.types";
import db from "../db/config";
import { Request, Response, NextFunction } from "express";
import { Category, CategoryWithSubcategories, Dua,  JoinedRow, SubCategory} from "../types";

// Get all categories
// GET /api/dua-categories
export const getCategories = async (req: Request, res: Response<ApiResponse<Category[]>>, next: NextFunction) => {
    try {
        const categories = await db.prepare("SELECT * FROM category").all() as Category[];
        
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
            data:categories,
            total_count: categories.length
        });
    } catch (error) {
        next(error);
    }
};

//get category by id
// GET /api/dua-categories/:id
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


//get subcategories by cat id
// GET /api/v1/dua-categories/:id/subcategories
export const getDuaSubcategoriesByCatId = async (
  req: Request,
  res: Response<ApiResponse<CategoryWithSubcategories>>
) => {
  const categoryId = req.params.id;

  try {
    const rows = db.prepare(`
    SELECT
        c.id AS category_id,
        c.cat_name_bn,
        c.cat_name_en,

        sc.id AS subcat_id,
        sc.subcat_name_bn,
        sc.subcat_name_en,

        d.id AS dua_id,
        d.cat_id AS dua_cat_id,
        d.subcat_id AS dua_subcat_id,
        d.dua_id AS dua_number,
        d.dua_name_bn,
        d.dua_name_en,
        d.top_bn,
        d.top_en,
        d.dua_arabic,
        d.dua_indopak,
        d.clean_arabic,
        d.transliteration_bn,
        d.transliteration_en,
        d.translation_bn,
        d.translation_en,
        d.bottom_bn,
        d.bottom_en,
        d.refference_bn,
        d.refference_en,
        d.audio

        FROM category c
        JOIN sub_category sc ON sc.cat_id = c.cat_id
        LEFT JOIN dua d ON d.subcat_id = sc.subcat_id
        WHERE c.cat_id = ?
        ORDER BY sc.id, d.id
    `).all(categoryId) as JoinedRow[];

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const result: CategoryWithSubcategories = {
      id: rows[0].category_id,
      name_bn: rows[0].cat_name_bn,
      name_en: rows[0].cat_name_en,
      subcategories: [],
    };

    const subcatMap = new Map<number, SubCategory>();

    for (const row of rows) {
      if (!subcatMap.has(row.subcat_id)) {
        const subcat: SubCategory = {
          id: row.subcat_id,
          name_bn: row.subcat_name_bn,
          name_en: row.subcat_name_en,
          duas: [],
        };
        subcatMap.set(row.subcat_id, subcat);
        result.subcategories.push(subcat);
      }

      if (row.dua_id) {
        const dua: Dua = {
            id: row.dua_id,
            cat_id: row.dua_cat_id!,
            subcat_id: row.dua_subcat_id!,
            dua_id: row.dua_number!,
            dua_name_bn: row.dua_name_bn!,
            dua_name_en: row.dua_name_en!,
            top_bn: row.top_bn!,
            top_en: row.top_en!,
            dua_arabic: row.dua_arabic,
            dua_indopak: row.dua_indopak,
            clean_arabic: row.clean_arabic,
            transliteration_bn: row.transliteration_bn,
            transliteration_en: row.transliteration_en,
            translation_bn: row.translation_bn,
            translation_en: row.translation_en,
            bottom_bn: row.bottom_bn,
            bottom_en: row.bottom_en,
            refference_bn: row.refference_bn,
            refference_en: row.refference_en,
            audio: row.audio
        };
        subcatMap.get(row.subcat_id)!.duas.push(dua);
        }

    }

    return res.status(200).json({
      success: true,
      message: "Subcategories loaded",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching data",
    });
  }
};
