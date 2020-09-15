const knex = require('knex')
const configuration = require('../../knexfile') // '../' volta um diretório, 'knexfile' está dois diretórios acima

const connection = knex(configuration.development) // escolhendo a configuração development do knexfile.js

module.exports = connection