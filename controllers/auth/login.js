const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require("../../models");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

// @ POST /api/users/login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await userModel.User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

module.exports = login;
