'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Venues', [
        {
          name: 'The Studio Seattle',
          address: '305 Harrison Street The Armory',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98109',
        },
        {
          name: 'AR Workshop Seattle',
          address: '8507 35th Ave NE',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98115',
        },
        {
          name: 'Ballard Coffee Works',
          address: '2060 NW Market St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98107',
        },
        {
          name: 'societyM meeting rooms Seattle',
          address: '201 Westlake Ave N',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98109',
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Venues', null, {});
  }
};
