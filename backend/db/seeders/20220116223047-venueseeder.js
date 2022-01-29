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
          published: true
        },
        {
          name: 'AR Workshop Seattle',
          address: '8507 35th Ave NE',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98115',
          published: true
        },
        {
          name: 'Ballard Coffee Works',
          address: '2060 NW Market St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98107',
          published: true
        },
        {
          name: 'societyM meeting rooms Seattle',
          address: '201 Westlake Ave N',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98109',
          published: true
        },
        {
          name: 'Wallingford House',
          address: '3300 Wallingford Ave N',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98109',
          published: true
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
