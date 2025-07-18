import { Router } from "express";
import { getDuas, getDuaById, getDuasByCategoryId, getDuasBySubcategoryId } from "../controllers/dua.controller";

const router = Router();

router.get("/", getDuas);
router.get("/:id", getDuaById);
router.get("/category/:id", getDuasByCategoryId);
router.get("/subcategory/:id", getDuasBySubcategoryId);

export default router;