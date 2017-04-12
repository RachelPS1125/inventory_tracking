'use strict';
module.exports = function(sequelize, DataTypes) {
  var Lend = sequelize.define('Lend', {
    lenderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    borrowerId: DataTypes.INTEGER,
    inventoryId: DataTypes.INTEGER,
    returnTime: DataTypes.TIME,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Lend.belongsTo(models.Borrower);
        Lend.belongsTo(models.User);
        Lend.belongsTo(models.Inventory);
      }
    }
  });
  return Lend;
};
    