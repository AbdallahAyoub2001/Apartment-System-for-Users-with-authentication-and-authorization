/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_group', table => {
        table.increments('id');
        table.string('user_id').notNullable().references('id').inTable('users');
        table.string('group_id').notNullable().references('group_id').inTable('group');
        table.primary('id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_group');
};
