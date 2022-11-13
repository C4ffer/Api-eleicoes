const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    numero: {
        required: true,
        type: Number
    },
    cargo: {
        required: true,
        type: String
    },
    descricao: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Candidato', dataSchema)