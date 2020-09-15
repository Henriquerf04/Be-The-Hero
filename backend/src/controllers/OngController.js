const crypto = require('crypto')       // importando pacote crypto (vem junto com o node)
const connection = require('../database/connection')  // conexão com o banco


module.exports = {

    async index(req, res) {
        const ongs = await connection('ongs').select('*')
     
        return res.json(ongs) 
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body
    
        const id = crypto.randomBytes(4).toString('HEX')      // gerando ID aleatório de 4 caracteres e converte em hexadecimal
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id }) 
    }
}