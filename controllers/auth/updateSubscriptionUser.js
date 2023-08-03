const { userModel } = require("../../models");

const { HttpError } = require("../../helpers");

// @ PATCH /api/users/:userId/subscription
const updateSubscriptionUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.user;
  const { subscription } = req.body;

  const result = await userModel.User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = updateSubscriptionUser;
