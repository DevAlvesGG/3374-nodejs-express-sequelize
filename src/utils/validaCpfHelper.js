module.exports = (cpf) => {
    // Implementação da lógica de validação de CPF
    if(cpf.length !== 11) return false;
    return true;
};