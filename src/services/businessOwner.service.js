import models from "../database/models/index.js";
import "regenerator-runtime/runtime";
import validator from "validator"


const { BusinessOwners } = models;

/**
 * @description This service deals with the businessOwners model
 */
export default class businessOwnerServices {
/**
   * @description this service create a new businessOwner in the db
   * @param {object} businessOwner
   * @return {object} return the created businessOwner
   */
  static async createBusinessOwner(businessOwner) {
    const businessOwners = await BusinessOwners.create(businessOwner);
    const { password, ...result } = businessOwners.dataValues;
    return result;
  }

  /**
   * @description this service create a new businessOwner in the db
   * @param {object} value
   * @return {object} return object if found
   */
  static async getBusinessOwnerByIdOrEmail(value) {
    let businessOwner;
    if (typeof value === "string") {
      businessOwner = await BusinessOwners.findOne({ where: { email: value } });
      return businessOwner;
    }
    return await BusinessOwners.findOne({ where: { id: value } });
  }
  // static async checkUsername(value) {
  //   let businessOwner;
  //     businessOwner = await BusinessOwner.findOne({ where: {username: value } });
  //     return businessOwner; 
  // }


  static async updateBusinessOwner(decoded){
    const businessOwners = await BusinessOwners.update({is_email_verified:true}, {
      where: { id: decoded.id },
      returning: true,
      plain: true,
      })
    return businessOwners
  }

 

  static async getBusinessOwnerByEmail(value) {
    let businessOwners;
        businessOwners = await BusinessOwners.findOne({ where: { email: value }});
      return businessOwners;
    }
    

static async getBusinessOwnerByUsername(value) {
  let businessOwners;
      businessOwners = await BusinessOwners.findOne({ where: { username: value }});

    return businessOwners;
  }
  


static async getBusinessOwnerByUsernameOrEmail(value) {
  let businessOwner;

  if (validator.isEmail(value)) {
    businessOwner = await BusinessOwners.findOne({ where: { email: value } });
   
    return businessOwner;
  }

  return await BusinessOwner.findOne({ where: { username: value } });
}

static async retrieveBusinessOwnerById(value) {
  const businessOwners = await BusinessOwners.findOne({
      where: {id:value},
      attributes: {exclude: "password"}
  })
  return businessOwners      
}

 /**
    * @description this service updatebusinessOwnerByRole
    * @param {object} roleId
    * @param {object} email
    * @return {object} updatedbusinessOwner by role
    */

   static async updateBusinessOwnerByRole(roleId, email) {
    const updatedbusinessOwner = await BusinessOwners.update({ roleId }, { where: { email } });
    if (updatedbusinessOwner) return updatedbusinessOwner;
  }



static async getAllBusinessOwners() {
  let businessOwners;
      businessOwners = await BusinessOwners.findAll( {attributes: {exclude: "password"}})

  return businessOwners;
  }

  static async updateBusinessOwnerInfo(updates,id){

    const businessOwners = await BusinessOwners.update(updates,{where: { id:id },attributes: {exclude: ["email","password","username"]}, returning: true })

    return businessOwners
  }
    static async changingPassword(hash,id){
    const businessOwners = await BusinessOwners.update(
      { password: hash },
      {
        where: { id:id },
      returning: true,
      plain: true,
      }
  );
    return businessOwners
  }
  static async updatePassword(hash, decoded) {
    const businessOwners = await BusinessOwners.update(
      { password: hash },
      {
        where: { id: decoded.businessOwnerId },
        returning: true,
        plain: true,
      }
    );
    return businessOwners;
  }
  static async updateRememberMe(id, state) {
    const updatedbusinessOwner = await BusinessOwners.update({ rememberMe: state }, { where: { id } });
    return updatedbusinessOwner;
  }
  
  

}

