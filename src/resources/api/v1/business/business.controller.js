import BusinessService from "./business.service"
import customMessage from "../../../../utils/customMessage";
import statusCode from "../../../../utils/statusCode";
import responses from "../../../../utils/responses";
const {ok,badRequest,notFound } = statusCode;
const { successResponse,errorResponse} = responses;
const {createBusiness,viewAllBusiness,businessDeactive,UpdateBusiness,checkBusiness} = BusinessService

class Business {

    static async createBusiness(req, res, next) {

        try {
            const formData = req.body
           
            const businessOwner=req.user.username;
            const businessOwnerId=req.user.id;
            formData.owner=businessOwner
            formData.businessOwnerId=businessOwnerId
            const business = await createBusiness(formData)

           return res.status(200).json({message:"business created successfully",business})
        }
        catch (err) {
            return next(new Error(err))
        }
    }
    static async myBusiness(req,res,next){
      // see a particular  business (mine)
      try{
        const id=req.params.id
        console.log("check idd",id)
        const data = await checkBusiness(id)
        res.status(200).json({message:"contact",data})
    }
    catch(e){
        return next(new(Error(e)))
    }

    }
    static async editBusiness(req,res){
      //editing my business
      try{
        const id=req.params.id
        const formData = req.body
        const dbResponse = await UpdateBusiness(formData,id)
        res.status(200).json({message:"update a contact!!",dbResponse})
      }
      catch(e){
        return next(new(Error(e)))
      }
   
    }
    static async allBusiness(req,res){
      // all businesses
      try{
        const UserId=req.user.id
        const business= await viewAllBusiness(UserId)
        return res.status(200).json({message:"all business",business})
      }
      catch(e){
        return next(new(Error(e)))
      }
     

    }
   
    static async deactiveBusiness(req,res,next){
      // my own businesses where id businessOwner  ....
      // try{

        const id=req.params.id
        console.log("check idd",id)
        const data = await businessDeactive(id)
        res.status(200).json({message:"view business"})
      // }
      // catch(e){
      //   return next(new(Error(e)))
      // }
      
    }

}

export default Business