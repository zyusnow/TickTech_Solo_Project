'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING(50),
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    description: DataTypes.STRING(1000),
    virtual: DataTypes.BOOLEAN,
    virtualUrl:DataTypes.STRING(200),
    imgUrl: DataTypes.STRING(200),
    published:DataTypes.BOOLEAN,
    hostId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, {
      foreignKey: 'hostId'
    });

    Event.belongsTo(models.Type, {
      foreignKey: 'typeId'
    });

    Event.belongsTo(models.Venue, {
      foreignKey: 'venueId'
    });

    // Event.belongsToMany(models.User, {
    //   through: 'Register',
    //   otherKey: 'userId',
    //   foreignKey: 'eventId'
    // });

    // Event.belongsToMany(models.User, {
    //   through: 'Like',
    //   otherKey: 'userId',
    //   foreignKey: 'eventId'
    // });

  };
  return Event;
};
