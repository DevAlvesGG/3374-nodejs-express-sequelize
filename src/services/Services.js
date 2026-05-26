const dataSource = require('../models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll();
    }

    async atualizaRegistro(dadosAtualizado, id) {
        const listaDeRegistroAtualizado = await dataSource[this.model].update(dadosAtualizado, {
            where: {
                id: id
            }
        })

        if(listaDeRegistroAtualizado[0] === 0) {
            return false;
        }
        return true;
    }
}

module.exports = Services;