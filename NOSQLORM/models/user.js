const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    isRequired: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    ],
  },
});

userSchema.methods.addToCart = function(product) {
  const index = this.cart.items.findIndex((v)=>
    v.product.toString() == product._id.toString());
  if (index >= 0) {
    this.cart.items[index] = {
      product: product._id,
      quantity: (this.cart.items[index].quantity)+1,
    };
  } else {
    this.cart.items.push({
      product: product._id,
      quantity: 1,
    });
  }
  this.save();
};

userSchema.methods.deleteCart = function(id) {
  const index = this.cart.items.findIndex((v)=>
    v.product.toString() == id.toString());
  this.cart.items.splice(index, 1);
  this.save();
};


module.exports = mongoose.model("users", userSchema);
