const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart"); // Assuming you have a Cart model
const order = require("../models/order");

// Route to place an order
router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = await Cart.findOne({ user: userId });
    console.log(cart.items);
    // return;cc
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const newOrder = new Order({
      user: userId,
      items: cart.items,
      total: cart.total,
      hostel: req.body.hostel,
      orderPlaced: true,
      orderDelivered: false, // Set initial status to not delivered
      outForDelivery: false,
    });
    newOrder.total = parseFloat(newOrder.total).toFixed(2)
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get all orders
async function getCart(userId) {
  const cart = await Cart.findOne({ user: userId }).populate("items.icecream", "name price");
  return cart;
}
async function getUser(userId) {
  const user = await User.findById(userId);
}
router.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await order.find();
    const ordersWithUserData = [];
    for (const element of orders) {
      const userId = element.user;
      const userData = await User.findById(userId);
      const orderWithUserData = { ...element, userData: userData };
      ordersWithUserData.push(orderWithUserData);
    }
    console.log(ordersWithUserData);
    res.status(200).json({ message: "Orders Fetched Succesfully", orders: ordersWithUserData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
})

router.put("/outForDelivery/:orderId" ,async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Update the outForDelivery field to true
    order.outForDelivery = true;
    await order.save();
    res.json({ message: "Order marked as Out for Delivery", order: order });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to update the orderPlaced field when the order is placed
router.put("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Update the orderPlaced field to true
    order.orderDelivered = true;
    order.orderPlaced = false;
    order.total = parseFloat(order.total).toFixed(2);
    await order.save();
    const userId = order.user;
    const cart = await Cart.findOne({ user: userId });
    console.log(cart);
    if (cart) {
      cart.items = [];
      cart.total = 0;
      console.log("Cart cleared");
      await cart.save();
    }
    res.json({ message: "Order marked as Delivered", order: order });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get order By userId
router.get("/getOrderById/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const ordersss = await order.find({user: userId});
    res.status(200).json({ message: "Orders Fetched Succesfully By UserId", orders: ordersss });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
