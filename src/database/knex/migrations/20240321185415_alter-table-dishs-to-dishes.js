/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 **/

exports.up = (knex) => knex.schema.renameTable("dishs", "dishes");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.renameTable("dishes", "dishs");
