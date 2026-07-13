const Services = require('./Services');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa')
    }

    async pegaMatriculasAtivasPorEstudante(estudanteId) {
        const estudante = await super.pegaUmRegistroPorId(estudanteId);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }

    async pegaTodasAsMatriculasPorEstudante(estudanteId) {
        const estudante = await super.pegaUmRegistroPorId(estudanteId);
        const listaMatriculas = await estudante.getTodasAsMatriculas();
        return listaMatriculas;
    }

    async pegaPessoasEscopoTodos() {
        const listaPessoas = await super.pegaTodosRegistrosPorEscopo('todosOsRegistros');
        return listaPessoas;
    }
}

module.exports = PessoaServices;