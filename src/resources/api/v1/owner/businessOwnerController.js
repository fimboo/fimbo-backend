
import BusinessOwner from "./businessOwner.service";
import customMessage from "../../../../utils/customMessage";
import helper from "../../../../utils/helpers";
import responses from "../../../../utils/responses";
import statusCode from "../../../../utils/statusCode";
import Mailer from "../../../../utils/mail/mailer";
import {jwtToken} from "../../../../utils/jwt.utils"
import{addEmailToMailchimp} from "../../../../utils/mailchimp"
import errorMessage from "../../../../utils/errorMessage";
import redisClient from "../../../../database/redisConfig"
import hash from "../../../../utils/helpers"
const { decryptPassword } = hash


const { createBusinessOwner,getBusinessOwnerByIdOrEmail,updateBusinessOwner,getBusinessOwnerByUsernameOrEmail} = BusinessOwner;
const { hashPassword } = helper;
const { signedup,accountVerified,resend,userVerification,loggedin,passwordReset,passwordUpdated} = customMessage;
const{emailAssociate,thisAccountVerified,emailOrUsernameNotFound,accountNotVerified,emailOrPasswordNotFound,accountNotActivated,passwordMatch,noEmailAssociate}=errorMessage
const {ok,badRequest,unAuthorized,notFound,created } = statusCode;
const { successResponse,errorResponse } = responses;

/**
 * @description this controller deals with businessowner signup
 */
export default class BusinessOwnerController {
/**
   * @description this controller saves/signup a businessOwner in database
   * @param {object} req request
   * @param {object} res response
   * * @param {object} next jump to error
   * @return {object} return json object with signup message
   */
  static async signup(req, res,next) {

    // try{
      const formData = req.body;
      const textPassword = formData.password;
      formData.password = hashPassword(textPassword);
      const roleName = "BusinessOwner";
      const role = await roleService.findRoleByName(roleName);
      if (!role) {
        console.log(`FATAL: create ${roleName} role first of all.[In your terminal, run:  'sequelize db:seed:all  ']`);
        return res.status(400).json({error:"roles not found"})
        
      }
      formData.roleId = role.id
      const owner = await createBusinessOwner(formData);
      console.log(owner)
      const token = jwtToken.createToken(owner);

      const mail = new Mailer({
        to: `${owner.username} <${owner.email}>`,
        header: 'Confirm your email',
        messageHeader: `Hi, <strong>${owner.firstname}!</strong>`,
        messageBody: 'You are requesting to confirm your email, Click the following Button to confirm your email.',
        optionLink: `${process.env.APP_URL}/api/${process.env.API_VERSION}/owner/confirmation/${token}`,
        browserMessage:`If that doesn't work, copy and paste this link into your browser`,
        Button:true
      });
      mail.InitButton({
        text: 'Confirm Your Email',
        link: `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/confirmEmail?email=${owner.email}&token=${token} `
      });
      await mail.sendMail();
      // await addEmailToMailchimp(owner.email,owner.firstname,owner.lastname)
      
      return successResponse(res, created, token, signedup, owner);
    // }

    // catch(e){
    //   return next(new Error(e))
    // }
  }


  /**
   * @description this controller confirm the email
   */
  static async confirmation(req,res,next){

    try{
      const {token}=req.params
      const decoded = jwtToken.verifyToken(token);
      const owner=await getBusinessOwnerByIdOrEmail(decoded.email)
      if(owner.is_email_verified||owner.is_phone_verified){
        return errorResponse(res,badRequest,thisAccountVerified);
      }
    
      else{
        const mail = new Mailer({
          to: `${owner.username} <${owner.email}>`,
          header: 'Thank you for confirmation',
          messageHeader: `Hi, <strong>${owner.firstname}!</strong>`,
          messageBody: 'Thank you for confirming your email,your email confirmed successfully.',
          browserMessage:"",
          Button:"",
          optionLink:""
        });
      
        await mail.sendMail();
        const ownerUpdated = await updateBusinessOwner(decoded)
        console.log(ownerUpdated)
        // adding thank you message
        const { id,email,isVerified} = ownerUpdated[1];
        return successResponse(res,ok,undefined,accountVerified)
      
      }


      
    }
    catch(e){
      return next(new Error(e))
    }
  

  }
    /**
   * @description this controller resend confirmation link to the email 
   */
  static async resend(req,res,next){
    try{
      const{email}=req.body
      const owner= await getBusinessOwnerByIdOrEmail(email)
      if(!owner) return errorResponse(res,badRequest,emailAssociate)
      if(owner.is_email_verified||owner.is_phone_verified){
        return errorResponse(res,badRequest,thisAccountVerified);

      } 
      else{
        const token = jwtToken.createToken(owner)
        const mail = new Mailer({
          to: `${owner.username} <${owner.email}>`,
          header: 'Confirm your email',
          messageHeader: `Hi, <strong>${owner.firstname}!</strong>`,
          messageBody: 'You are requesting to confirm your email, Click the following Button to confirm your email.',
          optionLink: `${process.env.APP_URL}/api/${process.env.API_VERSION}/owner/confirmation/${token}`,
          browserMessage:`If that doesn't work, copy and paste this link into your browser`,
          Button:true
        });
        mail.InitButton({
          text: 'Confirm Your Email',
          link: `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/confirmEmail?email=${owner.email}&token=${token} `
        });
        await mail.sendMail();
  
        return successResponse(res,ok, token,resend,owner);
  
      }
      
    }
    catch(e){
      return next(new Error(e))
    }

  }


  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
     const  owner = await getBusinessOwnerByUsernameOrEmail(email);
  
      if (!owner)
      {
        return errorResponse(res,badRequest,emailOrUsernameNotFound);
      }
      if (owner.is_email_verified===false && owner.is_phone_verified===false)
      {
        return errorResponse(res,unAuthorized,accountNotVerified);
      }
      if (owner.status !== 'active')
      {
        return errorResponse(res,unAuthorized,accountNotActivated,);
      }
      const decryptedPassword = await decryptPassword(password,owner.password);
      if (!decryptedPassword) {
        return errorResponse(res,notFound,emailOrPasswordNotFound);
      }
      const token = jwtToken.createToken(owner)
      return successResponse(res,ok, token , loggedin, owner);
    }


    catch (err) {
      return next(new Error(err));
    }


  }
    /**
     * @description send reset link 
     * @param {object} req  request
     * @param {object} res response
     * @param {object} next for jumping to error
     * @return error json object with notFound message
     * @return return json object with passwordReset message
     */

     static async forgetPassword(req,res,next){
        try{

            const{email}=req.body
            const owner= await getUserByEmail(email)
            if(!owner) return errorResponse(res,notFound,noEmailAssociate);
            const token = jwtToken.createToken(owner)
          
            const mail = new Mailer({
                to: `${owner.username} <${owner.email}>`,
                header: 'Forget password',
                messageHeader: `Hi, <strong>${owner.firstname}!</strong>`,
                messageBody: 'You are requesting to reset your password, Click the following Button to reset your password.',
                optionLink: `${process.env.APP_URL}/api/${process.env.API_VERSION}/reset_password/${token}`,
                browserMessage:`If that doesn't work, copy and paste this link into your browser`,
                Button:true
              });
              mail.InitButton({
                text: 'Reset password',
                link: `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/resetPassword?email=${owner.email}&token=${token} `
              });
              await mail.sendMail();
            return successResponse(res,ok,token,passwordReset,owner);
        }
        catch(e){
            return next(new Error(e))
        }

    }
        /**
         * @description reset password
         * @param {object} req request 
         * @param {*} res  response
         * @param {*} next checking error
         * @return passwordMatch error
         * 
         */
    static async resetPassword(req,res,next){

        try{
            const {password,confirmPassword} = req.body;
              if (password !== confirmPassword) return errorResponse(res,badRequest,passwordMatch);
            const { token } = req.params;
            const decoded = jwtToken.verifyToken(token);
            const owner= await getBusinessOwnerByEmail(decoded.email)
            const mail = new Mailer({
                to: `${owner.username} <${owner.email}>`,
                header: 'Reset Password',
                messageHeader: `Hi, <strong>${owner.firstname}!</strong>`,
                messageBody: 'Thank you for Resetting your password,your password has been reset successfully.',
                browserMessage:"",
                Button:"",
                optionLink:""

              });
            
              await mail.sendMail();
            const hash = hashPassword(password);
            const updatedOwner= await updatePassword(hash,decoded)
            
            return successResponse(res,ok,undefined,passwordUpdated);
        }
        catch(e){
            return next(new Error(e))
        }

        }


}