const converteIds = require('../utils/conversorDeStringHelper');

class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async pegaTodos(req, res) {
        try {
            const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
            return res.status(200).json(listaDeRegistro)
        } catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar os registros, ${error.message}` });
        }
    }

    async pegaUmPorId(req, res) {
        const { id } = req.params;
        
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));

            if(!umRegistro) {
                return res.status(404).json({message: 'Registro não encontrado'});
            }

            return res.status(200).json(umRegistro);
        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar o registro, ${error.message}` });
        }
    }

    async pegaUm(req, res) {
        const { ...params } = req.params;
        const where = converteIds(params);
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistro(where);
            if(!umRegistro) {
                return res.status(404).json({message: 'Registro não encontrado'});
            }
            return res.status(200).json(umRegistro);
        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao buscar o registro, ${error.message}` });
        }
    }

    async criaNovo(req, res) {
        const dadosParaCriacao = req.body;

        try {
             const novoRegistro = await this.entidadeService.criaRegistro(dadosParaCriacao);
            console.log(novoRegistro);

            if(!novoRegistro) {
                return res.status(400).json({ message: 'Não foi possivel criar o registro' });
            }

            return res.status(201).json(novoRegistro);
        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao criar o registro, ${error.message}` });
        }
    }

    async atualiza(req, res) {
        const { ...params } = req.params;
        const dadosAtualizados = req.body;
        const where = converteIds(params)

        try {
            // foiAtualizado esta retornando como undefined
            const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, where);
            
            if(!foiAtualizado) {
                return res.status(400).json({ message: 'Não foi possível atualizar o registro' })
            }

            return res.status(200).json({ message: 'Registro atualizado com sucesso'});
            
        } catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao atualizar o registro, ${error.message}` });
            
        }
    }

    async exclui(req, res) {
        const { id } = req.params;

        try {
            await this.entidadeService.excluiRegistro(Number(id));
            return res.status(200).json({ message: 'Registro excluído com sucesso' });

        }catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao excluir o registro, ${error.message}` });
        }
    }
}

module.exports = Controller;