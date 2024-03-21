const knex = require("../database/knex");
const AppError = require("../utils/app-error");

class DishsController {
  async index(request, response) {
    const { name, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dishes = await knex("dish_ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.price",
          "dishes.picture",
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("dish_ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "dish_ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name");
    } else {
      dishes = await knex("dishes")
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    }

    const dishesIngredients = await knex("dish_ingredients");

    const dishWithIngredients = dishes.map((dish) => {
      const dishIngredient = dishesIngredients.filter(
        (integredient) => integredient.dish_id === dish.id,
      );

      return {
        ...dish,
        ingredients: dishIngredient,
      };
    });

    return response.status(200).json(dishWithIngredients);
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

        await knex("dish_ingredients").where({ id }).insert(ingredientList);
      }
    } catch (error) {
      console.log(error);
      throw new AppError("Internal Server Error", 500);
    }

    return response.status(200).json();
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
