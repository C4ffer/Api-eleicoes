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
    partido: {
        required: true,
        type: String
    },
    totalVotos: {
        required: true,
        type: Number
    },
    porcentagem: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Resultados', dataSchema)