/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('apartment_files', table => {
        table.increments('id');
        table.integer('apartment_id').unsigned();
        table.integer('file_id').unsigned();
        table.primary('id');
        table.foreign('apartment_id').references('apartments.id');
        table.foreign('file_id').references('file_manager.file_id');
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('apartment_files');
};
