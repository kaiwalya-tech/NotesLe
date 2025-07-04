// File: src/controllers/itemController.js

const Item = require('../models/Item');

// POST /api/items
async function createItem(req, res, next) {
  try {
    const { title, description } = req.body;
    const item = await Item.create({
      title,
      description,
      owner: req.user.id
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

// GET /api/items
async function getItems(req, res, next) {
  try {
    const items = await Item.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

// PUT /api/items/:id
async function updateItem(req, res, next) {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/items/:id
async function deleteItem(req, res, next) {
  try {
    const result = await Item.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });
    if (!result) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createItem, getItems, updateItem, deleteItem };
