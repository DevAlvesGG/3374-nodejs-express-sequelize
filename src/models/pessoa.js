'use strict';
const isCpfValido = require('../utils/validaCpfHelper.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, { foreignKey:'docente_id' },
      );
      Pessoa.hasMany(models.Matricula, { 
        foreignKey: 'estudante_id',
        //scopes: { status: 'matriculado' },
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'O campo nome deve ter no minimo 3 caracteres e no maximo 30 caracteres'
        }
      }
    },
    email: { 
      type: DataTypes.STRING, 
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do email inválido'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfIsValid: (cpf) => {
          if(!isCpfValido(cpf)) throw new Error('Numero de CPF inválido');
        }
      }
    }, 

    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',// Define o nome da tabela como 'pessoas'
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todosOsRegistros: {
        where: {}
      }
    }

  });
  return Pessoa;
};