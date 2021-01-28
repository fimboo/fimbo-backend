'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define('Employees', {
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
    hiredate: DataTypes.DATE,
    supervisor:DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    is_email_verified: { type: DataTypes.BOOLEAN },
    is_phone_verified:  { type: DataTypes.BOOLEAN },
    last_login: DataTypes.DATE,
    status:DataTypes.STRING

  }, {

  });
  Employees.associate=models=>{
    Employees.belongsToMany(models.BusinessOwners,{
      through:models.BownerEmployee,
      as:'businessOwners',
      foreignKey:'employee_id'
      
    })
    Employees.belongsToMany(models.Business,{
      through:models.BownerBusinessEmployee,
      as:'businesses',
      foreignKey:'employeeId'
      
    })
    Employees.belongsTo(models.Role, {
      as:"role",
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKeyConstraint: true,
    });
  }

  return Employees;
};