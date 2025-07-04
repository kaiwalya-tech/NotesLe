// File: src/routes/items.js

const express = require('express');
const {
  createItem,
  getItems,
  updateItem,
  deleteItem
} = require('../controllers/itemController');
const router = express.Router();

// POST   /api/items       → Create a new item
router.post('/', createItem);

// GET    /api/items       → Get all items for the user
router.get('/', getItems);

// PUT    /api/items/:id   → Update one of the user’s items
router.put('/:id', updateItem);

// DELETE /api/items/:id   → Delete one of the user’s items
router.delete('/:id', deleteItem);

module.exports = router;
