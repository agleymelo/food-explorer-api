const knex = require("../database/knex");
const AppError = require("../utils/app-error");

class CategoriesController {
  async index(request, response) {
    const categories = await knex("categories");

    return response.status(200).json(categories);
  }

  async create(request, response) {
    const { title } = request.body;

    const categoryAlreadyExist = await knex("categories")
      .where({ title })
      .first();

    if (categoryAlreadyExist) {
      throw new AppError("Categorias já existente!");
    }

    const [category] = await knex("categories").insert({ title });

    return response.status(201).json({ id: category, title });
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await knex("categories").where({ id }).first();

    if (!category) {
      throw new AppError("Categoria não encontrada!");
    }

    await knex("categories").where({ id }).delete();

    return response.status(204).json();
  }
}

module.exports = CategoriesController;
