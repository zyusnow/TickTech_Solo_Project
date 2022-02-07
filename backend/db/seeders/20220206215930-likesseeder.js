'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Likes', [
        {
          userId: 1,
          eventId: 1
        },
        {
          userId: 2,
          eventId: 1
        },
        {
          userId: 3,
          eventId: 1
        },
        {
          userId: 1,
          eventId: 2
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Likes', null, {});
  }
};
