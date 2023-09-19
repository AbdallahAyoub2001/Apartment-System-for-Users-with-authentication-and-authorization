/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_group', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();;
        table.integer('group_id').unsigned();;
        table.foreign('user_id').references('users.id');
        table.foreign('group_id').references('group.group_id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_group');
};
