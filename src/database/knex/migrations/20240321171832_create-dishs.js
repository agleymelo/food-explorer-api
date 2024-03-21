/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("dishs", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description");
    table.double("price", 2);
    table.text("picture");

    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("dishs");
