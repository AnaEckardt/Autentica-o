const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.use(express.json())
/*Nossa base de dados*/ 
const usuarios = []
 
app.post('/usuarios', (req, res)=> {
    /*verifica se usuario ja foi criado*/
    for (let i = 0; i < usuarios.length; i++){
        if(usuarios[i].email == req.body.email){
            res.status(406).send("Usuário já cadastrado");
            return
        }
    }
    let hash = bcrypt.hashSync(req.body.senha,10)
    let obj = {
        id: usuarios.length + 1,
        nome: req.body.nome,
        email: req.body.email,
        senha: hash,
        perfil: req.body.perfil
    }
    usuarios.push(obj)
    res.status(201).send(obj)
})
 
app.post('/usuarios/login', (req, res)=> {
    let obj = {
        email:req.body.email,
        senha:req.body.senha
    }
    let achou = false
    let token = ''
    for (let i = 0; i < usuarios.length; i++){
        if(usuarios[i].email == req.body.email){
           achou = bcrypt.compareSync(req.body.senha, usuarios[i].senha)
           token = jwt.sign({id:usuarios[i].id, nome:usuarios[i].nome, email:usuarios[i].email, perfil:usuarios[i].perfil},123)
           break
        }
    }
        if(!achou )
        res.status(400).send('Usuário ou senha inválida')
    return
})

    res.status(200).send(token)
 
app.listen(port, () =>{
    console.log(`teste ${port}`)
})

