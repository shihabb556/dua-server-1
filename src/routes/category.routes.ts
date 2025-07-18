import { Router } from "express";
import { getCategories, getSubcategoriesByCategoryId } from "@/controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getSubcategoriesByCategoryId);

export default router;