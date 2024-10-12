// routes/produtos.js
const express = require('express');
const router = express.Router();
const validarProduto = require('../middleware/validarProduto.middleware.js');
const { Produto } = require('../models');


router.get('/', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json({ produtos: produtos });
});


router.get('/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
        res.json({ produto });
    } else {
        res.status(404).json({ msg: "Produto não encontrado!" });
    }
});

router.post('/', validarProduto, async (req, res) => {
    const produto = await Produto.create(req.body);
    res.status(201).json({ msg: "Produto adicionado com sucesso!", produto });
});


router.put('/:id', validarProduto, async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
        await produto.update(req.body);
        res.json({ msg: "Produto atualizado com sucesso!" });
    } else {
        res.status(404).json({ msg: "Produto não encontrado!" });
    }
});

router.delete('/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
        await produto.destroy();
        res.json({ msg: "Produto removido com sucesso!" });
    } else {
        res.status(404).json({ msg: "Produto não encontrado!" });
    }
});

module.exports = router;