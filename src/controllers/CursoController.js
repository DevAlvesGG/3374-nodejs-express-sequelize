const { Op } = require('sequelize');
const Controller = require('./Controller');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
    constructor() {
        super(cursoServices);
    }

    async pegaCursos(req, res) {
        const { data_inicio, data_final } = req.query;
        const where = {};

        // Se existir data_inicio, inicializa e define o operador gte
        if (data_inicio){
            where.data_inicio = {
                [Op.gte]: data_inicio
            };
        }

        // Se existir data_final, inicializa e define o operador lte
        if (data_final) {
            where.data_final = {
                [Op.lte]: data_final
            };
        }

        try {
            const listaDeCursos = await cursoServices.pegaTodosOsRegistros(where);//were obj vazio
            return res.status(200).json(listaDeCursos);
        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar os cursos, ${error.message}`})
        }
    }
}   


module.exports = CursoController;