/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_files', table => {
        table.increments('id');
        table.string('user_id').notNullable().references('id').inTable('users');
        table.string('file_id').notNullable().references('file_id').inTable('file_manager');
        table.primary('id');
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_files');
};
