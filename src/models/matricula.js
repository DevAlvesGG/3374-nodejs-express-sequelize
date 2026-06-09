'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    static associate(models) {
      Matricula.belongsToMany(models.Pessoa, { foreignKey: 'estudante_id' },
       );
      Matricula.belongsToMany(models.Curso, { foreignKey: 'curso_id' },
       );
    }
  }
  Matricula.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName: 'matriculas'
  });
  return Matricula;
};