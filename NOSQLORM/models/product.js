const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model("products", productSchema);
