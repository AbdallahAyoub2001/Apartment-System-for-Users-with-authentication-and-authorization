/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('group_permission', table => {
        table.increments('id');
        table.string('group_id').notNullable().references('group_id').inTable('group');
        table.string('code_id').notNullable().references('code_id').inTable('permission');
        table.primary('id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('group_permission');

};
