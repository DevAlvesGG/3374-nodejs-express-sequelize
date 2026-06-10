const Services = require('./Services');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa')
    }

    async pegaMatriculasPorEstudante(estudanteId) {
        const estudante = await super.pegaUmRegistroPorId(estudanteId);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }
}

module.exports = PessoaServices;