'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Events', [
        {
        name: "Cybersecurity Meetup",
        date: "2022-02-22 19:00:00",
        capacity:50,
        description:"A talk about Cybersecurity recent trading research.",
        virtual:false,
        imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642375110/redd-PTRzqc_h1r4-unsplash_u42oct.jpg",
        published: true,
        hostId: 1,
        venueId: 1,
        typeId: 4
        },
        {
        name: "Blockchain Workshops",
        date: "2022-01-30 18:00:00",
        capacity:200,
        description:"This meetup is for anyone who is interested in blockchain technology. All levels of experience are warmly welcomed.",
        virtual:true,
        virtualUrl:"https://www.youtube.com/watch?v=hYip_Vuv8J0",
        imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642374105/tezos-y8wjQZ9XP4A-unsplash_qap0c9.jpg",
        published: true,
        hostId: 1,
        venueId: 2,
        typeId: 2
        },
        {
          name: "Tech Coffee Chat",
          date: "2022-03-18 10:00:00",
          capacity:60,
          description:"Morning meetup with best tech geeks in Seattle downtown",
          virtual:false,
          imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642375143/priscilla-du-preez-nF8xhLMmg0c-unsplash_djdmu4.jpg",
          published: true,
          hostId: 1,
          venueId: 3,
          typeId: 1
        },
        {
          name: "2022 Spring Tech Job Fair",
          date: "2022-03-12 15:00:00",
          capacity:200,
          description:"Join us. Find 100+ resources here. ",
          virtual:false,
          imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642375411/priscilla-du-preez-XkKCui44iM0-unsplash_lfjpax.jpg",
          published: true,
          hostId: 2,
          venueId: 4,
          typeId: 3
        },



    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Events', null, {});
  }
};
