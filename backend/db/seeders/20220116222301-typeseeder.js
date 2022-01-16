'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Types', [
        {name: 'Meeting or Networking Event'},
        {name: 'Conference'},
        {name: 'Job Fair'},
        {name: 'Talk or Seminar'},
        {name: 'Competition'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Types', null, {});
  }
};
