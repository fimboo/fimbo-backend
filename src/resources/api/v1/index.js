import express from "express";
import Business from "./business/business.route"
import BusinessCategory from "./business/businessCategory.routes"
import Owner from "./owner/owner.route"

const router = express.Router();
router.use("/owner", Owner)
router.use("/user", User);
router.use("/business_category", BusinessCategory)
router.use("/business", Business)
router.use('/rolesPermissions', rolePerm);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);

export default router;
