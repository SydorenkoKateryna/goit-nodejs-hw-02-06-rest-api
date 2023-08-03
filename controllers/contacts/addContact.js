const { contactModel } = require("../../models");

// @ POST /api/contacts
const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await contactModel.Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = addContact;
