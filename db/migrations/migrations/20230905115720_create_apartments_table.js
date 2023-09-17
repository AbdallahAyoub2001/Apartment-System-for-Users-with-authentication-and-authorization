
exports.up = function(knex) {
    return knex.schema.createTable('apartments', table => {
        table.increments('id');
        table.string('type').notNullable();
        table.string('status').notNullable();
        table.primary('id');
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('apartments');
};
