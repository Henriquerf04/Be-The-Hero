
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments()                     // criar id sequêncial para cada incident

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()   // formato 'float'
        
        table.string('ong_id').notNullable()                     // coluna que irá armazenar o 'id' da ong
        table.foreign('ong_id').references('id').inTable('ongs') // coluna 'ong_id' referencia a chave estrangeira 'id' da tabela 'ongs'
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};
