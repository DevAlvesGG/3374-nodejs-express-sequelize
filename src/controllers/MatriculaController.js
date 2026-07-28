const Sequelize = require('sequelize');
const Controller = require('./Controller');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
    constructor() {
        super(matriculaServices);
    }

    async pegaMatriculasPorEstudante(req, res) {
        const { estudante_id } = req.params;
        try {
            const listaDeMAtriculasPorEstudante = await matriculaServices.pegaEcontaRegistros({
                where: {
                    estudante_id: Number(estudante_id),
                    status: 'matriculado'
                },  
                limit: 2,
                order: [['id', 'ASC']]
            })
            return res.status(200).json(listaDeMAtriculasPorEstudante);
        } catch (error) {
            return res.status(500).json( { message: `Erro ao buscar matricula por estudante, erro: ${error.message}` })
        }
    }

    async pegaCursosLotados(req, res) {
        const lotacaoCurso = 2;
        try {
            const cursosLotados = await matriculaServices.pegaEcontaRegistros({
                where: {
                    status: 'matriculado'
                },
                attributes: ['curso_id'],
                group: ['curso_id'],
                having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
            })
            return res.status(200).json(cursosLotados.count);
        } catch (error) {
            return res.status(500).json( { message: `Erro ao buscar matricula por estudante, erro: ${error.message}` })
        }
    }

    
}

module.exports = MatriculaController;