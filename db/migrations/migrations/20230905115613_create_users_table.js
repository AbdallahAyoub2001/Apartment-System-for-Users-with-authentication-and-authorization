/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.primary('id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
