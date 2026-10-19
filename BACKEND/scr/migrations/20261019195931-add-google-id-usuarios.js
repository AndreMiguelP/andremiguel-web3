'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'google_id', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });

    await queryInterface.changeColumn('usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'google_id');
  }
};