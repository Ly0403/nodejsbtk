const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [{
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model("orders", orderSchema);
