
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').primary()          // cria strings não sequenciais, uma por ong (usado para login)
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()   // fixa o tamanho da string em 2
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};
