'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {

    name:DataTypes.STRING,
    description: DataTypes.STRING,

  }, {
  timestamps:false,
  });

  Role.associate = models =>{
  
  Role.hasMany(models.Users, {
    foreignKey: 'roleId',
    targetKey: 'id',
    onDelete: 'SET DEFAULT',
    onUpdate: 'CASCADE',
    as: 'users',
    foreignKeyConstraint: true,
  });

 Role.hasMany(models.Employees, {
    foreignKey: 'roleId',
    targetKey: 'id',
    onDelete: 'SET DEFAULT',
    onUpdate: 'CASCADE',
    as: 'employees',
    foreignKeyConstraint: true,
  });
  Role.hasMany(models.BusinessOwners, {
    foreignKey: 'roleId',
    targetKey: 'id',
    onDelete: 'SET DEFAULT',
    onUpdate: 'CASCADE',
    as: 'businessOwners',
    foreignKeyConstraint: true,
  });


  Role.belongsToMany(models.Permission, {
    through: models.rolepermission,
    as: 'permissions',
    foreignKey: 'role_id'
  });
}
 
  return Role;
};