const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() {
      return this.isActive;
    },
    minLength: 2,
    maxLength: 50,
    uppercase: true,
    trim: true,
    get: (value) => value,
    set: (value) => value + " " + new Date().getFullYear(),
  },
  image: {
    type: String,
    enum: ['1.jpeg', '2.jpeg', '3.jpeg'],
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
  isActive: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    // custom validator
    validate: {
      validator: function(value) {
        // return value.length>0;
        return true;
      },
      message: 'no tags',
    },
  },
});

module.exports = mongoose.model("products", productSchema);
