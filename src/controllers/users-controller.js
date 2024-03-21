const { hash } = require("bcryptjs");

const knex = require("../database/knex");
const AppError = require("../utils/app-error");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userAlreadyExist = await knex("users").where({ email }).first();

    if (userAlreadyExist) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashedPassword });

    return response.status(201).json();
  }
}

module.exports = UsersController;
