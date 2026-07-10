const Controller = require('./Controller');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
    constructor() {
        super(pessoaServices);
    }

    async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;

        try {
            const listaMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudanteId));
            console.log(listaMatriculas);

            if(!listaMatriculas) {
                return res.status(404).json({ message: 'Nenhuma Matricula encontrada para este estudante'});
            }

            return res.status(200).json(listaMatriculas);

        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar as matrículas, ${error.message}` });
        }
    }

    async pegaTodasAsPessoas(req, res) {
        try {
            const listaPessoas = await pessoaServices.pegaPessoasEscopoTodos();
            return res.status(200).json(listaPessoas);
        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar as pessoas, ${error.message}` });
        }
    }
}

module.exports = PessoaController;