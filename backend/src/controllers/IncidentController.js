const connection = require('../database/connection')  // conexão com o banco

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query

        const [count] = await connection('incidents').count()  // entre colchetes retorna somente primeira posição do array
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // buscar ong que o id seja igual ao ong_id do caso
            .limit(5)                                       // limitar quantidade de 5 casos
            .offset((page - 1) * 5)                         // iniciar contagem do 0 na pag1, do 5 na pag2, do 10 na pag3...
            .select([
                'incidents.*',                // selecionar todos as colunas da tabela incidents
                'ongs.name',                  // não selecionar id da ONG para não sobrepor o id do caso (mesmo nome)
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ])                                    

        res.header('X-Total_Count', count['count(*)'])      // retornar informação de total de casos ao frontend

        return res.json(incidents)
    },


    async create(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        const [id] = await connection ('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({ id })

    },
    async delete(req, res) {
        const { id } = req.params                           // buscando id do incident selecionado
        const ong_id = req.headers.authorization            // buscando id da ONG logada

        const incident = await connection('incidents')      // buscando o 'incident' na tabela 'incidents'
            .where('id', id)                                // buscando 'incident com id = id do params
            .select('ong_id')                               // selecionar a coluna ong_id
            .first()                                        // selecionar o primeiro registro
        if (incident.ong_id != ong_id) {                    // verificar se ong_id da ONG logada é o ong_id do 'incident'
            return res.status(401).json({ error: 'Operation not permitted.' })          // HTTP status code para 'não autorizado' 401
        }

        await connection('incidents').where('id', id).delete() // selecionar 'incident' na tabela com o id correspondente e deletar registro

        return res.status(204).send()                          // 204 = resposta de sucesso sem conteúdo
    }
}
