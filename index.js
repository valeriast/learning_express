const express = require('express');

const server = express();
server.use(express.json());
const cursos = ['Node js', 'Javascript', 'React js']

server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/curso/:index', (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index])

});

server.post('/cursos', (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
 
})

server.delete('/curso/:index', (req,res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json({message: "Curso deletado com sucesso"})
})

server.listen(3000);