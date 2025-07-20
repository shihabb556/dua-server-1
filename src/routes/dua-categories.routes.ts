import { Router } from "express";
import { getCategories, getCategoryById,getDuaSubcategoriesByCatId} from "../controllers/dua-categories.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.get("/:id/subcategories", getDuaSubcategoriesByCatId);


export default router;