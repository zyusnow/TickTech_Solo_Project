'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.Event, {
      foreignKey: 'eventId'
    });
    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Like;
};
