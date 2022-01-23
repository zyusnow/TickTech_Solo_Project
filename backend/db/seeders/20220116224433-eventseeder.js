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
        date: "2022-02-28 18:00:00",
        capacity:200,
        description:"This meetup is for anyone who is interested in blockchain technology. All levels of experience are warmly welcomed.",
        virtual:true,
        virtualUrl:"https://www.youtube.com/watch?v=hYip_Vuv8J0",
        imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642374105/tezos-y8wjQZ9XP4A-unsplash_qap0c9.jpg",
        published: true,
        hostId: 1,
        typeId: 2
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
        name: "Seattle Tech Career",
        date: "2022-04-20 16:30:00",
        capacity:500,
        description:"We will be hosting a Tech Career Fair with our hiring partners from fast growing startups and Fortune 500 companies in technology.  There will be a focus on helping companies achieve their diversity and inclusivity initiative with more diverse candidates to their talent pool. Available roles that our hiring companies are looking to fill are of the following:Software Engineering,Product Management, Data Scientist, AI/Machine Learning Engineer, Data Analyst, UI/UX Design, Sales",
        virtual:false,
        imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642375299/jakob-dalbjorn-cuKJre3nyYc-unsplash_uqcmac.jpg",
        published: true,
        hostId: 2,
        venueId: 2,
        typeId: 3
        },
        {
        name: "Network Hacking 101",
        date: "2022-04-17 20:00:00",
        capacity:100,
        description:"A talk about Cybersecurity recent trading research.",
        virtual:false,
        imgUrl: "https://res.cloudinary.com/dprnsux1z/image/upload/v1642929980/clean_501094842_zvntet.jpg",
        published: true,
        hostId: 1,
        venueId: 5,
        typeId: 4
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
