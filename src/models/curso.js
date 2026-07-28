'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      Curso.belongsTo(models.Categoria, { foreignKey: 'categoria_id' },
       );
      Curso.belongsTo(models.Pessoa, { foreignKey: 'docente_id' },
       );
       Curso.hasMany(models.Matricula, { foreignKey: 'curso_id' },
        );
    }
  }
  Curso.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY,
    data_final: {
      type: DataTypes.DATEONLY,
      allowNull: false, // O Sequelize vai impedir cadastros sem data_final a nível de código
      validate: {
        notNull: { msg: "A data final é obrigatória." },
        notEmpty: { msg: "A data final não pode ser vazia." }
      }
    }

  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos'
  });
  return Curso;
};