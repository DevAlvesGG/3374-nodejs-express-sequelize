const Controller = require('./Controller');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
    constructor() {
        super(pessoaServices);
    }

    async pegaMatriculasAtivas(req, res) {
        const { estudante_id } = req.params;

        try {
            const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));
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

    async pegaTodasAsMatriculas(req, res) {
        const { estudante_id } = req.params;
        try {
            const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_id));
            return res.status(200).json(listaMatriculas);
        } catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar as matrículas, ${error.message}` });
        }
    }

    async cancelaRegistroEstudante(req, res) {
        const { estudante_id } = req.params;
        try {
           await pessoaServices.cancelaPessoaEMatricula(Number(estudante_id)) 
           return res.status(200).json({ message: `Matrículas ref. estudante ${estudante_id} canceladas.`})
        } catch (error) {
            return res.status(500).json({ erro: erro.message})
        }
    }
}

module.exports = PessoaController;