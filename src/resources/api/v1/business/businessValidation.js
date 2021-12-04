import Joi from "joi"

class BusinessValidation{
    static details(req,res,next){
        const Schema=Joi.object({

          
         business_name:Joi.string().min(3).required().messages({
                "any.required": res.__('Business name is required'),
                "string.empty": res.__('Business name must not be empty'),
                "string.min": res.__(`Business name should have a minimum length of {#limit}`)
            }),
            categoryId:Joi.number().required().messages({
                "any.required": res.__('category is required'),
                "number.empty": res.__('category must not be empty'),
              
            }),
            country:Joi.string().required().messages({
                "any.required": res.__('country is required'),
                "string.empty": res.__('country must not be empty'),
              
            }),
            province:Joi.string().required().messages({
                "any.required": res.__('province is required'),
                "string.empty": res.__('province must not be empty'),

            }),
            district:Joi.string().required().messages({
                "any.required": res.__('district is required'),
                "string.empty": res.__('district must not be empty'),
              
            }),
            currency:Joi.string().required().messages({
                "any.required": res.__('currency is required'),
                "string.empty": res.__('currency must not be empty'),
              
            }),
            tin:Joi.string().min(3).required().messages({
                "any.required": res.__('TIN is required'),
                "string.empty": res.__('TIN must not be empty'),
                "string.min": res.__(`TIN should have a minimum length of {#limit}`)
            }),
         })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }

}

export  default BusinessValidation

