/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('file_manager', table => {
        table.increments('file_id');
        table.string('old_name').notNullable();
        table.string('new_name').notNullable().unique();
        table.string('folder').notNullable();
        table.string('path').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('file_manager');
};