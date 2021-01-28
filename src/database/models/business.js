'use strict';

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {

    business_name:DataTypes.STRING,
    categoryId:DataTypes.INTEGER,
    businessOwnerId: DataTypes.INTEGER,
    owner:DataTypes.STRING,
    logo:DataTypes.STRING,
    country:DataTypes.STRING,
    province:DataTypes.STRING,
    district:DataTypes.STRING,
    sector:DataTypes.STRING,
    cell:DataTypes.STRING,
    phone:DataTypes.STRING,
    currencyId:DataTypes.INTEGER,
    tin:DataTypes.STRING,
    website:DataTypes.STRING,
    workspace:{
      type:DataTypes.ENUM('owned','rental'),
      defaultValue:'owned'
    },
    status:{
      type:DataTypes.ENUM('activate','unactivate'),
      defaultValue:'active'
    },
    about_business:DataTypes.STRING,
    owner:DataTypes.STRING,

  }, {});
 
  Business.associate = models => {

    Business.belongsTo(models.Currency, {
      as:"currency",
      foreignKey: 'currencyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKeyConstraint: true,
    });

  

    Business.belongsTo(models.Business_category, {
      as:"category",
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKeyConstraint: true,
    });
    
  
    Business.belongsTo(models.Employees, {
      through:models.BownerBusinessEmployee,
      foreignKey: 'employeeId',
      as: 'workers',
      onDelete: 'CASCADE',
    }) 
      
 
    Business.belongsTo(models. BusinessOwners,{
      as:'Businesses',
      foreignKey: 'businessOwnerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKeyConstraint: true,
      
    })
    
  }
  return Business;
};