'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessOwners = sequelize.define('BusinessOwners', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    password: DataTypes.STRING,
    rememberMe: { type: DataTypes.BOOLEAN },
    provider: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM('female', 'male', 'prefer not to say'),
    },
    birthdate: DataTypes.DATE,
    age: DataTypes.INTEGER,
    nationality: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    phone: DataTypes.STRING,
    workphone: DataTypes.STRING,
    preferedLanguage: DataTypes.STRING,
    business_number: DataTypes.DATE,
    employees_number:DataTypes.STRING,
    is_email_verified: { type: DataTypes.BOOLEAN },
    is_phone_verified:  { type: DataTypes.BOOLEAN },
    last_login: DataTypes.DATE,
    status:DataTypes.STRING
  }, {

  });
  BusinessOwners.associate=models=>{

    BusinessOwners.hasMany(models.Business, {
      foreignKey: 'businessOwnerId',
      targetKey: 'id',
      onDelete: 'SET DEFAULT',
      onUpdate: 'CASCADE',
      as: 'businessOwners',
      foreignKeyConstraint: true,
    })
  

  }

  return BusinessOwners;
};