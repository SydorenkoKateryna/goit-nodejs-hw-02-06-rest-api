const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { userModel } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

// @PATCH /api/users/avatars
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // Resize the image to width 250 and height 250
  const image = await jimp.read(`${tempUpload}`);
  image.cover(250, 250);
  await image.writeAsync(`${tempUpload}`);

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await userModel.User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
