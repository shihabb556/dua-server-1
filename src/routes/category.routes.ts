import { Router } from "express";
import { getCategories, getCategoryById, getSubcategoriesByCategoryId } from "@/controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.get("/:id", getSubcategoriesByCategoryId);

export default router;