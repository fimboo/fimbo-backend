import express from "express";
import Business from "./business/business.routes"
import BusinessCategory from "./businesscategory/businessCategory.routes"
import Owner from "./owner/owner.routes"

const router = express.Router();
router.use("/owner", Owner)
router.use("/business_category", BusinessCategory)
router.use("/business", Business)

export default router;
