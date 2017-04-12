'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    imageLink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Inventory.hasMany(models.Lend, {foreignKey: 'inventoryId'});
      }
    }
  });
  return Inventory;
};