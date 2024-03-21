const { rename, stat, unlink } = require("node:fs/promises");
const { resolve } = require("node:path");

const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await rename(
      resolve(uploadConfig.TMP_FOLDER, file),
      resolve(uploadConfig.UPLOADS_FOLDER, file),
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await stat(filePath);
    } catch {
      return;
    }

    await unlink(filePath);
  }
}

module.exports = DiskStorage;
