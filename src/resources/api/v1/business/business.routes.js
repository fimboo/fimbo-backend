import express from "express"
import businessController from './business.controller'
// import authentication from "../../../../middlewares/authentication"
// import authorize from '../../../../middlewares/userAuthorization';

const router = express.Router()

router.post("/create", businessController.createBusin)
router.post("/create", businessController.createBusin)
router.post("/create", businessController.createBusin)
router.post("/create", businessController.createBusin)
export default router
