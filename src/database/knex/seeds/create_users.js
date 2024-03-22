/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: "Admin Food Explorer",
      email: "admin@explorer.com",
      password: "$2a$08$w.RC1JFhQzn2ek9Ve628xekOQPYx3KrdipGiaglYJUJvco6tM/12a",
      role: "admin",
    },
  ]);
};
