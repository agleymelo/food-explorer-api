const knex = require('knex')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) =>
  knex.schema.alterTable('dishes', function (table) {
    table.dropColumn('category_id')
    table.text('category').notNullable()
  })

exports.down = (knex) =>
  knex.schema.alterTable('dishes', function (table) {
    table.dropColumn('category')

    table.integer('category_id').nullable().alter()
  })
