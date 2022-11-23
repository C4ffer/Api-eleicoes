const express = require('express');
const Model = require('../models/resultados');
const ModelVotacao = require('../models/votacao');
const ModelCandidatos = require('../models/candidatos');
const router = express.Router();


//Get by ID Method
router.get('/:id', async (req, res) => {
    try {
        var votos = []
        var retorno = []
        const data = await ModelVotacao.find({ cargo: req.params.id });
        console.log(data)
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            votos.push(data[i].voto)
        }
        const contagem = {};
        votos.forEach(function (x) { contagem[x] = (contagem[x] || 0) + 1; });
        console.log(contagem)
        numerosVotados = Object.keys(contagem)
        console.log(numerosVotados)
        var totalVotos = votos.length
        var nulos = 0;
        var id = 0;
        for (let i = 0; i < numerosVotados.length; i++) {
            //console.log(numerosVotados[i])
            var dataCandidatos = await ModelCandidatos.find({ numero: numerosVotados[i], cargo: req.params.id });
            //console.log(dataCandidatos[0])
            if (dataCandidatos[0] === undefined) {
                nulos += 1
            }
            else {
                console.log("DEBUG: dataCandidatos")
                console.log(dataCandidatos)
                id++;
                var votoCandidato = {}
                votoCandidato.id = id
                votoCandidato.nome = dataCandidatos[0].nome
                votoCandidato.numero = dataCandidatos[0].numero
                votoCandidato.votos = contagem[numerosVotados[i]]
                votoCandidato.porcentagem = contagem[numerosVotados[i]] / totalVotos

                retorno.push(votoCandidato)
            }

        }

        var votoCandidato = {}
                votoCandidato.id = id + 1
                votoCandidato.nome = "NULOS"
                votoCandidato.numero = 0
                votoCandidato.votos = nulos
                votoCandidato.porcentagem = nulos / totalVotos

                retorno.push(votoCandidato)

        console.log(retorno)
        // const data = await ModelVotacao.find();
        res.json(retorno)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;