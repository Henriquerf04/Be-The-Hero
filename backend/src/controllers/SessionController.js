const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { id } = req.body

        const ong = await connection('ongs')  // buscando na tabela de ONGs
            .where('id', id)                  // quando id = id recebido do body
            .select('name')                   // selecionar nome da ONG
            .first()                          // selecionar primeiro registro

        
        if (!ong) {
            return res.status(400).json({ error: 'No ONG found with this ID' })  // 400 = Bad Request 
        }

        return res.json(ong)
    }
}