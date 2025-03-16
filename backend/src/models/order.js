const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      icecream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Icecream",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  orderPlaced: {
    type: Boolean,
    default: false,
  },
  orderDelivered: {
    type: Boolean,
    default: false,
  },
  outForDelivery: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
