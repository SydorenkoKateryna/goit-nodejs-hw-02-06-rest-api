const { contactModel } = require("../../models");

const { HttpError } = require("../../helpers");

// @ DELETE /api/contacts/:contactId
const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactModel.Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
