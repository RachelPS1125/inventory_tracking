'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Lends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lenderId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      borrowerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Borrowers',
          key: 'idNumber'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      inventoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Inventories',
          key: 'id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      returnTime: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      active:{
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Lends');
  }
};