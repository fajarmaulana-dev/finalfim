require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const { nanoid } = require("nanoid");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");

const clarify = async (req, res, next) => {
  const uid = req.params.uid;
  let users;
  try {
    users = await User.findById(uid);
  } catch (err) {
    const error = new HttpError("Kesalahan server", 404);
    return next(error);
  }

  if (!users) {
    const error = new HttpError("Pengguna tidak ditemukan", 404);
    return next(error);
  }

  res.status(200).json({ message: "found" });
};

const signup = async (req, res, next) => {
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "name") {
    return next(new HttpError("Nama tidak boleh kosong", 422));
  }
  if (errorParam[0] === "email") {
    return next(new HttpError("Email tidak valid", 422));
  }
  if (errorParam[0] === "password") {
    return next(
      new HttpError(
        "Password baru harus terdiri dari minimal 8 karakter dan terdiri dari minimal 1 huruf kapital, 1 huruf kecil, 1 angka, dan 1 karakter unik",
        422
      )
    );
  }
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Registrasi gagal, silakan coba lagi", 500);
    return next(error);
  }

  if (hasUser) {
    const error = new HttpError("Pengguna ini telah ada", 422);
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Registrasi gagal, silakan coba lagi", 500);
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Registrasi gagal, silakan coba lagi", 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
  });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "email") {
    return next(new HttpError("Email tidak valid.", 422));
  }
  const { email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Kesalahan server, silakan coba login kembali",
      500
    );
    return next(error);
  }

  if (!hasUser) {
    const error = new HttpError(
      "Kamu belum terdaftar sebagai panitia FIM",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, hasUser.password);
  } catch (err) {
    const error = new HttpError(
      "Kesalahan server, silakan coba login kembali",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Password yang kamu masukkan salah", 403);
    return next(error);
  }

  let accessToken;
  let refreshToken;
  try {
    accessToken = jwt.sign(
      { userId: hasUser.id, email: hasUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    refreshToken = jwt.sign(
      { userId: hasUser.id, email: hasUser.email },
      process.env.REFRESH_KEY,
      { expiresIn: "2d" }
    );
  } catch (err) {
    const error = new HttpError(
      "Kesalahan server, silakan coba login kembali",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Login berhasil",
    userId: hasUser.id,
    name: hasUser.name,
    email: hasUser.email,
    accessToken,
    refreshToken,
  });
};

const refresh = async (req, res, next) => {
  const { refreshToken, userId, email } = req.body;
  if (Date.now() >= jwtDecode(refreshToken).exp * 1000) {
    res.status(403).json({
      message: "Sesimu telah berakhir, silakan login kembali",
    });
  } else {
    let accessToken;
    try {
      accessToken = jwt.sign(
        { userId: userId, email: email },
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );
    } catch (err) {
      const error = new HttpError(
        "Tidak dapat merefresh token, silakan login kembali",
        500
      );
      return next(error);
    }
    res.status(200).json({ userId: userId, email: email, accessToken });
  }
};

const changePass = async (req, res, next) => {
  const { name, password, newPassword } = req.body;
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }
  const error = validationResult(req);
  const errorParam = error.errors.map((e) => e.param);
  if (errorParam[0] === "name") {
    return next(new HttpError("Nama tidak boleh kosong", 422));
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      "Kesalahan server, silakan coba login kembali",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Password lama yang kamu masukkan salah", 403);
    return next(error);
  }
  if (errorParam[0] === "newPassword") {
    return next(
      new HttpError(
        "Password baru harus terdiri dari minimal 8 karakter dan terdiri dari minimal 1 huruf kapital, 1 huruf kecil, 1 angka, dan 1 karakter unik",
        422
      )
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat memperbarui data, silakan coba lagi",
      500
    );
    return next(error);
  }

  user.name = name;
  user.password = hashedPassword;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Tidak dapat memperbarui data, silakan coba lagi",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Berhasil memperbarui data" });
};

const sendLink = async (req, res, next) => {
  const { email } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }

  if (!hasUser) {
    const error = new HttpError(
      "Pengguna dengan email yang diberikan tidak ada di database",
      422
    );
    return next(error);
  }

  const createdToken = new Token({
    userId: hasUser.id,
    token: nanoid(30),
  });

  try {
    await createdToken.save();
  } catch (err) {
    const error = new HttpError(
      "Gagal mendapatkan token, silakan coba lagi",
      500
    );
    return next(error);
  }
  const link = `${process.env.BASE_URL}/auth/reset/${createdToken.userId}/${createdToken.token}`;
  try {
    await sendEmail(
      hasUser.email,
      "Password reset",
      `Klik link ini untuk reset password: ${link}`
    );
  } catch (err) {
    const error = new HttpError("Email gagal terkirim", 500);
    return next(error);
  }

  res.status(200).json({
    message:
      "Email berhasil dikirim ke akun emailmu, segera akses tautan pada email sebelum 20 menit",
  });
};

const resetPass = async (req, res, next) => {
  const uid = req.params.uid;
  const token = req.params.token;
  const { password } = req.body;
  let hasToken;
  try {
    hasToken = await Token.findOne({
      userId: uid,
      token: token,
    });
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }
  if (!hasToken) {
    const error = new HttpError("Link tidak valid atau telah kadaluwarsa", 400);
    return next(error);
  }
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError("Kesalahan server, silakan coba lagi", 500);
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Gagal mereset password, silakan coba lagi",
      500
    );
    return next(error);
  }

  user.password = hashedPassword;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Gagal mereset password, silakan coba lagi",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ message: "Passwordmu berhasil direset, silakan login kembali" });
};

exports.clarify = clarify;
exports.signup = signup;
exports.login = login;
exports.refresh = refresh;
exports.changePass = changePass;
exports.sendLink = sendLink;
exports.resetPass = resetPass;
