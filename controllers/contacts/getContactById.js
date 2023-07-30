const { contactModel } = require("../../models");

const { HttpError } = require("../../helpers");

// @ GET /api/contacts/:contactId
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactModel.Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getContactById;
