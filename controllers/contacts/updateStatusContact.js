const { contactModel } = require("../../models");

const { HttpError } = require("../../helpers");

// @ PATCH /api/contacts/:contactId/favorite
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactModel.Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateStatusContact;
