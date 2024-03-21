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

    return response.status(201).json({ category });
  }
}

module.exports = CategoriesController;
