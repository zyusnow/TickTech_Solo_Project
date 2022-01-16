'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING(50)
  }, {});
  Type.associate = function(models) {
    // associations can be defined here
    Type.hasMany(models.Event, {
      foreignKey: 'typeId'
    });
  };
  return Type;
};
