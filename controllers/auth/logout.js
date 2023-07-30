const { userModel } = require("../../models");

// @ POST /api/users/logout
const logout = async (req, res) => {
  const { _id } = req.user;

  await userModel.User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

module.exports = logout;
