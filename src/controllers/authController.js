import UserSchema from "../models/userModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jsonwebtoken from "jsonwebtoken";

const createToken = async (id) => {
  const accessToken = await jsonwebtoken.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = await jsonwebtoken.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return { accessToken, refreshToken };
};
const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existUser = await UserSchema.findOne({ email });
  const isPasswordValid = await bcrypt.compare(password, existUser.password);
  if (!existUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const { accessToken, refreshToken } = await createToken(existUser.id);

  // Lưu refreshToken vào database
  existUser.refreshToken = refreshToken;
  await existUser.save();
  return res.status(201).json({
    message: "Login success",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const registerController = expressAsyncHandler(async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;
  const existUser = await UserSchema.findOne({ email });

  if (existUser) {
    res.status(401);
    throw new Error("User is exist!!!");
  }

  if (password !== confirmPassword) {
    return res
      .status(500)
      .json({ message: "Password is invalid. please try again" });
  }

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new UserSchema({
    email: email,
    name: name,
    password: hashPassword,
    confirmPassword: hashPassword,
  });

  const responseUser = {
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
  };

  const dataUser = await newUser.save();
  if (dataUser) {
    return res.status(201).json({
      message: "Register success!!!",
      status: 201,
      data: responseUser,
    });
  }
});

export { registerController, loginController };
