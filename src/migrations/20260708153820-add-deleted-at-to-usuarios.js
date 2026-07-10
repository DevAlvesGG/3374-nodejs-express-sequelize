
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'pessoas', // nome da tabela
      'deletedAt', // nome da coluna
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'pessoas',
      'deletedAt'
    );
  }
};
