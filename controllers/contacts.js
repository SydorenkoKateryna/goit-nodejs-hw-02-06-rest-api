const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

// @ GET /api/contacts
const listContacts = async (req, res) => {
  const result = await Contact.find();

  res.json(result);
};

// @ GET /api/contacts/:contactId
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// @ POST /api/contacts
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

// @ PUT /api/contacts/:contactId
const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// @ PATCH /api/contacts/:contactId/favorite
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// @ DELETE /api/contacts/:contactId
const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
