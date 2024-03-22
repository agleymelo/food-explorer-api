const knex = require("../database/knex");
const AppError = require("../utils/app-error");

class DishesController {
  async index(request, response) {
    const { search } = request.query;

    let dishes;

    if (search) {
      const keywords = search.split(" ").map(keyword => `%${keyword}%`)

      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.picture",
        ])
        .leftJoin("dish_ingredients", "dishes.id", "dish_ingredients.dish_id")
        .where(builder => {
          builder.where((builder_2) => {
            keywords.forEach(keyword => {
              builder_2.orWhere("dishes.name", "like", keyword)
            })
          })
          keywords.forEach(keyword => {
            builder.orWhere("dish_ingredients.name", "like", keyword)
          })
        })
        .groupBy("dishes.id")
        .orderBy("dishes.name");

    } else {
      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.picture",
        ])
        .orderBy("dishes.name");
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
      // .join("categories", "categories.id", "dishes.category")
      .select(
        "dishes.id",
        "dishes.name",
        "dishes.description",
        "dishes.price",
        "dishes.picture",
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
    const { name, description, price, category, ingredients } = request.body;

    const [dish] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
    });

    const ingredientList = ingredients.map((item) => ({
      dish_id: dish,
      name: item,
    }));

    await knex("dish_ingredients").insert(ingredientList);


    return response.status(201).json({ id: dish });
  }

  async update(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não localizado!", 404);
    }

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = Number(price) ?? dish.price;
    dish.category = category ?? dish.category;

    try {
      await knex("dishes").where({ id }).update({
        name,
        description,
        price,
        category,
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

module.exports = DishesController;
