import express from "express"
import businessController from './business.controller'
import CheckAuthorisation from "../../../../middlewares/authentication"
import checkowner from "../../../../middlewares/checkOwnership"


const router = express.Router()

router.post("/create",CheckAuthorisation,businessController.createBusiness)
router.get("/all",CheckAuthorisation,checkowner.mine,businessController.allBusiness)
router.get("/one/:id",CheckAuthorisation,checkowner.mine,businessController.myBusiness)
router.put("/edit/:id",CheckAuthorisation,checkowner.mine,businessController.editBusiness)
router.put("/deactivate/:id",CheckAuthorisation,checkowner.mine,businessController.deactiveBusiness)


export default router
