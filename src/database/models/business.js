'use strict';

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {

    business_name:DataTypes.STRING,
    categoryId:DataTypes.INTEGER,
    businessOwnerId: DataTypes.INTEGER,
    owner:DataTypes.STRING,
    country:DataTypes.STRING,
    province:DataTypes.STRING,
    district:DataTypes.STRING,
    sector:DataTypes.STRING,
    cell:DataTypes.STRING,
    phone:DataTypes.STRING,
    currency:DataTypes.STRING,
    tin:DataTypes.STRING,
    website:DataTypes.STRING,
    workspace:{
      type:DataTypes.STRING,
      defaultValue:'owned'
    },
    status:{
      type:DataTypes.STRING,
      defaultValue:'active'
    },
    about_business:DataTypes.STRING,
   

  }, {});
 
  Business.associate = models => {


    Business.belongsTo(models.Business_category, {
      as:"category",
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKeyConstraint: true,
    });
 
    // Business.belongsTo(models. BusinessOwners,{
    //   as:'Businesses',
    //   foreignKey: 'businessOwnerId',
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   foreignKeyConstraint: true,
      
    // })
    
  }
  return Business;
};