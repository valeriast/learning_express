const express = require('express');

const server = express();
server.use(express.json());
const cursos = ['Node js', 'Javascript', 'React js']

//middleware global acontece em qualquer chamada
server.use((req, res, next) => {
    console.log(`REQUISICAO CHAMADA ${req.url}`);
    return next()
})

//middleware 
function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: "Nome do curso eh obrigatorio"})
    }

    return next()
}

function checkIndexCuro(req, res, next){
    const curso = cursos[req.params.index]
    if(!curso){
        return res.status(400).json({ error: "Curso não existe"})
    }

    return next()
}

server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/curso/:index', checkIndexCuro, (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index])

});

server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', checkCurso, checkIndexCuro, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
 
})

server.delete('/curso/:index', checkIndexCuro, (req,res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json({message: "Curso deletado com sucesso"})
})

server.listen(3000);