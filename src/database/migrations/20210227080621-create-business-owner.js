'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessOwners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      rememberMe: { 
        type: Sequelize.BOOLEAN,
        defaultValue:false
       },
      provider:{
        type:Sequelize.STRING,
        defaultValue:'local'

      },
       profilePicture: {
        type: Sequelize.STRING,
        defaultValue:'https://res.cloudinary.com/fimboo/image/upload/v1609507499/profile_pictures/profile-icon-png-898_rashbu.png'
      },
      gender:{
        type:Sequelize.ENUM('female','male', 'prefer not to say'),
      },
      birthdate: {
        type: Sequelize.DATE
      },
      age:{
        type:Sequelize.INTEGER
      },
      nationality: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      countryCode:{
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      workphone: {
        type: Sequelize.STRING
      },
      preferedLanguage:{
        type:Sequelize.STRING,
        defaultValue:'en'
      },
      business_number: {
        type: Sequelize.INTEGER
      },
      employees_number: {
        type: Sequelize.INTEGER
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      is_phone_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      status:{
        type:Sequelize.STRING,
        defaultValue:'active'
      },
      last_login: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BusinessOwners');
  }
};