const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const authConfig = require("../configs/auth");
const AppError = require("../utils/app-error");
const knex = require("../database/knex");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    delete user.password;

    return response.status(200).json({
      user,
      token,
    });
  }
}

module.exports = SessionsController;
