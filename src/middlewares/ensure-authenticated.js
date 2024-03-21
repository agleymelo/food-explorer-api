const { verify } = require("jsonwebtoken");
const AppError = require("../utils/app-error");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch {
    throw new AppError("JWT Token invaliado", 401);
  }
}

module.exports = ensureAuthenticated;
