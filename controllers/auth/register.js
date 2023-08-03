const bcrypt = require("bcrypt");

const { userModel } = require("../../models");

const { HttpError } = require("../../helpers");

// @ POST /api/users/register
const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
