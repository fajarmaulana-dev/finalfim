require("dotenv").config();
const HttpError = require("../utils/http-error");
const jwt = require("jsonwebtoken");
const redisClient = require("../utils/connect-redis");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }
    if (!access_token)
      return next(
        new HttpError("Autentikasi gagal, silakan login terlebih dahulu.", 401)
      );
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY);
    if (!decoded)
      return next(
        new HttpError(
          "Token tidak valid atau kamu mungkin belum terdaftar sebagai member FIM.",
          401
        )
      );
    const session = await redisClient.get(decoded.userId);
    if (!session)
      return next(
        new HttpError("Sesimu telah berakhir, silakan login kembali.", 401)
      );
    const exist = await User.findById(JSON.parse(session)._id);
    if (!exist)
      return next(
        new HttpError(
          "Pengguna dengan token ini sudah tidak terdaftar di FIM.",
          401
        )
      );
    res.locals.user = exist;
    next();
  } catch (err) {
    next(err);
  }
};
