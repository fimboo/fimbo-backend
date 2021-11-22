import models from "../../../../database/models/index"
const{Business}=models

export default class BusinessCategory{

static async createBusiness(values){
   const businesses = await Business.create(values)
   return businesses
}
static async UpdateBusiness(updates,id){
   const business=await Business.update(updates,{where:{id:id},attributes:{exclude:["currency"]},returning:true})
   return business
}
static async  checkBusiness(id){
  const business= await Business.findOne({ where: { id: id } });
  return business
}


static async viewAllBusiness(id){
  const businesses= await Business.findAll({where: {businessOwnerId:id }})
  return businesses
}

static async businessDeactive(id){
  const business= await Business.update({status:"unactivate"},{ where: { id: id }, returning: true })
  // const business= await Business.findOne({ where: { id: id } });

  return business
}
}
