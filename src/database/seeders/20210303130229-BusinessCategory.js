'use strict';


module.exports = {
  up: async queryInterface=> queryInterface.bulkInsert(
    "Business_categories",
    [
      {
        id:1,
        name: "Trade of food, beverages or tobacco",
        shortcode: "food_beverages",
       
      },
      {
        id:2,
        name: "Trade of audio and video equipment",
        shortcode: "audio_video",
       
      },
      {
        id:3,
        name: "Trade of carpets, rugs, wall and floor coverings",
        shortcode: "carpets_rugs",
       
      },
      {
        id:4,
        name: "Trade of electrical household appliances, furniture, lighting equipment and other household articles",
        shortcode: "electrical_household",
       
      },
      {
        id:5,
        name: "Trade of cultural and recreation goods",
        shortcode: "cultural_recreation",
       
      },
      {
        id:6,
        name: "Trade of books, newspapers and stationary",
        shortcode: "books_newspapers",
       
      },
      {
        id:7,
        name: "Trade of music and video recordings",
        shortcode: "music_video",
       
      },
      {
        id:8,
        name: "Trade of sporting equipment",
        shortcode: "sporting_equipment",
       
      },
      {
        id:9,
        name: "Trade of games and toys",
        shortcode: "games_toys",
       
      },
      {
        id:10,
        name: "Trade of clothing, footwear and leather",
        shortcode: "clothing_footwear",
       
      },
      {
        id:11,
        name: "Trade of pharmaceutical and medical goods, cosmetic and toilet",
        shortcode: "pharmaceutical_medical ",
       
      },
      {
        id:12,
        name: "Trade of Saloon",
        shortcode: "saloon",
       
      },
      {
        id:13,
        name: "Trade of Papeterie",
        shortcode: "papeterie",
       
      },
      {
        id:14,
        name: "Trade of Quencallerie",
        shortcode: "quencallerie",
       
      },
      {
        id:15,
        name: "Studio",
        shortcode: "studio",
       
      },
      {
        id:16,
        name: "Super Market",
        shortcode: "supermarket",
       
      },
      {
        id:17,
        name: "Boutique",
        shortcode: "boutique",
       
      },
      {
        id:18,
        name: "Other",
        shortcode: "other",
       
      },

    ],
    {},
  ),

  down:queryInterface => queryInterface.bulkDelete("Business_categories", null, {}),
};
