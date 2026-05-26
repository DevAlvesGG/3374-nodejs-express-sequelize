class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async pegaTodos(req, res) {
        try {
            const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
            return res.status(200).json(listaDeRegistro)
        } catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro ao buscar os registros' });
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            // foiAtualizado esta retornando como undefined
            const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
            
            if(!foiAtualizado) {
                return res.status(400).json({ message: 'Não foi possível atualizar o registro' })
            }

            return res.status(200).json({ message: 'Registro atualizado com sucesso'});
            
        } catch (error) {
            return res.status(500).json({ message: `Ocorreu um erro ao atualizar o registro, ${error.message}` });
            
        }
    }
}

module.exports = Controller;