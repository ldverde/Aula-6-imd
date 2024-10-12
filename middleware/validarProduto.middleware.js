const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const produtoSchema = require('../schemas/produto.schema');

const ajv = new Ajv();
addFormats(ajv);

function validarProduto(req, res, next) {
    const validate = ajv.compile(produtoSchema);
    const valid = validate(req.body);

    if (valid) {
        next();
    } else {
        res.status(400).json({ msg: "Dados inválidos", erros: validate.errors });
    }
}

module.exports = validarProduto;