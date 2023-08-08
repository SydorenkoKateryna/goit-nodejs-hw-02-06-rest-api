const { userModel } = require("../../models");

const { HttpError } = require("../../helpers");

// @ GET /api/users/verify/:verificationToken
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await userModel.User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await userModel.User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
