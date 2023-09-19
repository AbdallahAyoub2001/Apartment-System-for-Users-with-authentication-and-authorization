/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('group_permission', table => {
        table.increments('id').primary();
        table.integer('group_id').unsigned();
        table.string('code_id');
        table.foreign('group_id').references('group.group_id');
        table.foreign('code_id').references('permission.code_id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('group_permission');

};
