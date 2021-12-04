import {viewAllBusiness} from "../resources/api/v1/business/business.service"
import models from "../database/models/index"
const{Business}=models

class CheckOwnership{

    static async mine(req,res,params,next){
        // const username=req.user.username
        const userId=req.user.id
        console.log("iddddd",userId)
        const business= await Business.findOne({id:id},{where:{businessOwnerId:userId },returning: true})
        console.log("check business length",business)
        if(business.length===0){
            return res.status(400).json({message:"you are not allowed to view business"})
            
        }
        // if(business.status!=="active"){
        //     return res.status(404).json({message:"you are business is not active"})
            
        // }
        return next()
    }

}

export default CheckOwnership
// BusinessOwners.findOne({ where: { email: value } });

// const user = await auth.getUser();
// const event = await Event.query()
//   .where("id", params.id)
//   .andWhere("user_id", user.id)
//   .fetch();
// if (event.toJSON().length === 0)
//   return response
//     .status(401)
//     .send("Forbidden. Event does not belong to you");
// // call next to advance the request
// await next();
// }