const dataSource = require('../models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async pegaTodosOsRegistros(where = {}) {// se nao receber nada como parametro, será iniciado como um obj vazio
        return dataSource[this.model].findAll({ where: { ...where } });
    }

    async pegaTodosRegistrosPorEscopo(escopo) {
        return dataSource[this.model].scope(escopo).findAll();
    }

    async pegaUmRegistroPorId(id) {
        return dataSource[this.model].findByPk(id);
    }

    async pegaUmRegistro(where) {
        return dataSource[this.model].findOne({ where: { ...where }});
    }

    async pegaEcontaRegistros(options) {
        return dataSource[this.model].findAndCountAll({...options})
    }

    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizado, where) {
        const listaDeRegistroAtualizado = await dataSource[this.model].update(dadosAtualizado, {
            where: { ...where }
        })
        if(listaDeRegistroAtualizado[0] === 0) {
            return false;
        }
        return true;
    }

    async excluiRegistro(id) {
        return dataSource[this.model].destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = Services;