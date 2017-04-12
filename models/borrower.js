'use strict';
module.exports = function(sequelize, DataTypes) {
  var Borrower = sequelize.define('Borrower', {
    idNumber: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    classYear: DataTypes.STRING,
    email: DataTypes.STRING,
    cellNumber: DataTypes.CHAR(10)
  }, {
    classMethods: {
      associate: function(models) {
        Borrower.hasMany(models.Lend, {foreignKey: 'borrowerId'});
      }
    }
  });
  return Borrower;
};
    