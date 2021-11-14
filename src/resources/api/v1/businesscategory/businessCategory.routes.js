import express from "express"
import businessController from "./businessCategory.controller"
// import authorization from '../../../../middlewares/userAuthorization';
import businessCategoryValidator from "./businessCategoryValidation"

const router = express.Router()

router.post("/", businessCategoryValidator.category, businessController.createCategory)
router.get("/", businessController.allCategories)
router.delete("/:id", businessController.deleteCategory)
router.put("/:id", businessController.updateCategory)
router.get("/:id", businessController.categoryById)

export default router
