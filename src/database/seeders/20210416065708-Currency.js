'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Currencies', [{
   
    cname:"USSD",
    cu_shortcode:"USSD"
    
    }, {
  
      cname:"FRW",
      cu_shortcode:"FRW"
    
    },

    {
   
      cname:"EURO",
      cu_shortcode:"EURO"
     
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

