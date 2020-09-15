const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()


routes.post('/sessions', SessionController.create)                 // Login ONG

routes.get('/ongs', OngController.index)                           // Lista todas as ONGs
routes.post('/ongs', OngController.create)                         // Cria ONG

routes.get('/profile', ProfileController.index)                    // Lista casos específicos de uma ONG

routes.get('/incidents', IncidentController.index)                 // Lista todos os casos
routes.post('/incidents', IncidentController.create)               // Cria novo caso
routes.delete('/incidents/:id', IncidentController.delete)         // Deleta caso



module.exports = routes