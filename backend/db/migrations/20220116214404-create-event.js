'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      virtual: {
        type: Sequelize.BOOLEAN
      },
      virtualUrl:{
        type: Sequelize.STRING(200),
      },
      imgUrl: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      published: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      hostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      venueId: {
        type: Sequelize.INTEGER,
        references: { model: 'Venues' }
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Types' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};