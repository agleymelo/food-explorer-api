const knex = require("../database/knex");
const AppError = require("../utils/app-error");

class DishsController {
  async index(request, response) {
    const { search } = request.query;

    const query =
      typeof search === "string" && search === "undefined" ? null : search;

    let dish;

    if (search) {
      const ingredients = await knex("dish_ingredients")
        .select("dish_id")
        .whereLike("name", `%${query}%`)
        .groupBy("dish_id");

      const dishIngredients = ingredients.map((item) => item.dish_id);

      dish = await knex("dishes")
        .join("categories", "categories.id", "dishes.category_id")
        .select(
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.price",
          "dishes.picture",
          "categories.id",
          "categories.title",
        )
        .whereLike("dishes.name", `%${query}%`)
        .orWhereIn("dishes.id", dishIngredients)
        .groupBy("dishes.id")
        .orderBy("categories.title");
    } else {
      dish = await knex("dishes")
        .join("categories", "categories.id", "dishes.category_id")
        .select(
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.price",
          "dishes.picture",
          "categories.id",
          "categories.title",
        )
        .orderBy("categories.title");
    }
    return response.status(200).json(dish);
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes")
      .join("categories", "categories.id", "dishes.category_id")
      .select(
        "dishes.id",
        "dishes.name",
        "dishes.description",
        "dishes.price",
        "dishes.picture",
        "categories.id",
        "categories.title",
      )
      .where("dishes.id", id)
      .first();

    if (!dish) {
      throw new AppError("Prato não localizado!", 404);
    }

    const ingredientList = await knex("dish_ingredients")
      .select("name")
      .where({ dish_id: id });
    const ingredients = ingredientList.map((item) => item.name);

    return response.status(200).json({
      ...dish,
      ingredients,
    });
  }

  async create(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;

    const [dish] = await knex("dishes").insert({
      name,
      description,
      price,
      category_id,
    });

    const ingredientList = ingredients.map((item) => ({
      dish_id: dish,
      name: item,
    }));

    const dishIngredients =
      await knex("dish_ingredients").insert(ingredientList);

    console.log("DISH", dish);
    console.log("ingredientList", ingredientList);
    console.log("dishIngredients", dishIngredients);

    return response.status(201).json({ id: dish });
  }

  async update(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não localizado!", 404);
    }

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = Number(price) ?? dish.price;
    dish.category_id = Number(category_id) ?? dish.category_id;

    try {
      await knex("dishes").where({ id }).update({
        name,
        description,
        price,
        category_id,
      });

      await knex("dish_ingredients").where({ dish_id: id }).del();

      const hasDishIngredients = ingredients?.length > 0;

      if (hasDishIngredients) {
        const ingredientList = ingredients.map((item) => ({
          dish_id: id,
          name: item,
        }));

        await knex("dish_ingredients").insert(ingredientList);
      }
    } catch (error) {
      console.log(error);
      throw new AppError("Internal Server Error", 500);
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não localizado!", 404);
    }

    await knex("dishes").where({ id }).del();

    return response.status(204).json();
  }
}

module.exports = DishsController;
