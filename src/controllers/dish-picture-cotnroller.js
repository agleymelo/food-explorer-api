const knex = require("../database/knex");
const DiskStorage = require("../providers/disk-storage");

class DishPictureController {
  async update(request, response) {
    const { id } = request.params;
    const pictureFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não localizado!", 404);
    }

    if (dish.picture) {
      await diskStorage.deleteFile(dish.picture);
    }

    const fileName = await diskStorage.saveFile(pictureFileName);
    dish.picture = fileName;

    await knex("dishes").where({ id }).update(dish);

    return response.status(200).json({ picture: fileName });
  }
}

module.exports = DishPictureController;
