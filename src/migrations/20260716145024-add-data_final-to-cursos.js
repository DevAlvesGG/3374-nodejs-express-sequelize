'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cursos', 'data_final', {
       type: Sequelize.DATEONLY,
       allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cursos', 'data_final');  
  }
};
