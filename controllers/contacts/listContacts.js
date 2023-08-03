const { contactModel } = require("../../models");

// @ GET /api/contacts
const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite = ["true", "false"] } = req.query;
  console.log(favorite);

  const skip = (page - 1) * limit;

  const result = await contactModel.Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.json(result);
};

module.exports = listContacts;
