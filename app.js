const express = require('express')
const app = express()
const port = 3000
const usuarioController = require('./controller/usuario_controller');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const loginRota = require('./rotas/login_rota');
app.use('/api/login', loginRota);

app.use(usuarioController.validaToken);

const produtoRota = require('./rotas/produto_rota');
app.use('/api/produtos', produtoRota);

const usuarioRota = require('./rotas/usuario_rota');
app.use('/api/usuarios', usuarioRota);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
