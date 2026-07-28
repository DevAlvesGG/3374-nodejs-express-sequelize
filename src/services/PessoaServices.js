const Services = require('./Services');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
        this.matriculaServices = new Services('Matricula');
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

    async cancelaPessoaEMatricula(estudanteId) {
        await super.atualizaRegistro({ativo: false},{id: estudanteId})
        await this.matriculaServices.atualizaRegistro({status: 'cancelado'}, {estudante_id: estudanteId});
    }
}

module.exports = PessoaServices;