const express = require('express') // importar pacote express
const cors = require('cors')       // importar módulo de segurança 'cors', determinar permissões de acesso à aplicação
const routes = require('./routes') // importar arquivo routes   './' = msm pasta deste arquivo


const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)                // precisa vir abaixo do 'use(express.json())'



app.listen(3333)
