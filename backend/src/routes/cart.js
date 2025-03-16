const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const User = require("../models/user");
const Icecream = require("../models/icecream");

// Route to get a user's cart
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ user: userId }).populate("items.icecream", "name price");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.total = parseFloat(cart.total).toFixed(2);

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Router to update cart according to request params
router.put("/:userId/update", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(req.body);
    const updatedItems = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    for (let updatedItem of updatedItems) {
      const itemIndex = cart.items.findIndex(item => item.icecream.toString() === updatedItem.icecream._id);

      if (itemIndex !== -1) {
        // Update existing item
        const itemToUpdate = cart.items[itemIndex];
        const icecream = await Icecream.findById(itemToUpdate.icecream);
        if (!icecream) {
          console.log("Ice cream not found");
          return res.status(404).json({ message: "Ice cream not found" });
        }

        const oldQuantity = itemToUpdate.quantity;
        itemToUpdate.quantity = updatedItem.quantity;

        cart.total = cart.total - (icecream.price * oldQuantity) + (icecream.price * updatedItem.quantity);
        cart.total = parseFloat(cart.total).toFixed(2);
      } else {
        // Add new item to cart
        const icecream = await Icecream.findById(updatedItem.icecream._id);
        if (!icecream) {
          return res.status(404).json({ message: "Ice cream not found" });
        }

        cart.items.push({ icecream: icecream._id, quantity: updatedItem.quantity });
        cart.total += icecream.price * updatedItem.quantity;
      }
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// router.put("/:userId/:productId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const productId = req.params.productId;

//     // Find the user's cart
//     const cart = await Cart.findOne({ user: userId });
//     // console.log(cart)
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Find the cart item corresponding to the productId
//     const cartItem = cart.items.find(item => item.icecream.toString() === productId);
//     if (!cartItem) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     // Find the product (icecream) corresponding to the productId
//     const icecream = await Icecream.findById(productId);
//     if (!icecream) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Increment the quantity of the cart item
//     cartItem.quantity += 1;

//     // Update the total of the cart
//     const updatedTotal = cart.total + icecream.price;
//     cart.total = updatedTotal;

//     await cart.save();

//     res.json({ message: "Product quantity incremented", cart: cart });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

router.put("/add/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId,"useID");
    const productId = req.params.productId;
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ user: userId, items: [], total: 0 });
    }

    // Find the cart item corresponding to the productId
    const cartItem = cart.items.find(item => item.icecream.toString() === productId);
    console.log(productId);
    console.log(cartItem);
    if (!cartItem) {
      // If the product is not in the cart, add it with a quantity of 1
      const icecream = await Icecream.findById(productId); // Assuming Icecream model exists
      if (!icecream) {
        return res.status(404).json({ message: "Product not found" });
      }
      cart.items.push({ icecream: icecream._id, quantity: 1 });
    } else {
      // Increment the quantity of the cart item
      cartItem.quantity += 1;
    }
    // Update the total of the cart
    // const updatedTotal = cart.total + cartItem.icecream.price;
    // cart.total = updatedTotal;
    let updatedTotal = 0;
    for (const item of cart.items) {
      const icecream = await Icecream.findById(item.icecream);
      if (icecream) {
        updatedTotal += icecream.price * item.quantity;
      }
    }
    cart.total = parseFloat(updatedTotal).toFixed(2);
    await cart.save();
    res.json({ message: "Product quantity incremented", cart: cart });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
// });
// router.put("/sub/:userId/:productId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const productId = req.params.productId;
//     console.log("Cart Api is Working");
//     // Find the user's cart
//     let cart = await Cart.findOne({ user: userId });
//     console.log("Stage 1")
//     if (!cart) {
//       // If the cart doesn't exist, create a new one
//       cart = new Cart({ user: userId, items: [], total: 0 });
//     }

//     // Find the cart item corresponding to the productId
//     const cartItem = cart.items.find(item => item.icecream.toString() === productId);
//     console.log("Stage 2")
//     if (!cartItem) {
//       return res.status(404).json({ message:"ice cream is not in cart"});

//       // // If the product is not in the cart, add it with a quantity of 1
//       // const icecream = await Icecream.findById(productId); // Assuming Icecream model exists
//       // console.log("Stage 3")
//       // if (!icecream) {
//       //   return res.status(404).json({ message: "Product not found" });
//       // }
//       // console.log("Stage 4")
//       // cart.items.push({ icecream: icecream._id, quantity: 1 });
//     } else {
//       // Increment the quantity of the cart item
//       cartItem.quantity -= 1;

//       if(cartItem.quantity===0){
//         // Find the index of the cart item in the array
//       const itemIndex = cart.items.findIndex(item => item.icecream.toString() === productId);

//       // Remove the item from the cart's items array
//       if (itemIndex !== -1) {
//         cart.items.splice(itemIndex, 1);
//       }
//       }
//     }
//     console.log("Stage 5")
//     // Update the total of the cart
//     // const updatedTotal = cart.total + cartItem.icecream.price;
//     // cart.total = updatedTotal;
//     // let updatedTotal = 0;
//     // for (const item of cart.items) {
//     //   const icecream = await Icecream.findById(item.icecream);
//     //   if (icecream) {
//     //     updatedTotal += icecream.price * item.quantity;
//     //   }
//     // }
//     // console.log(cart.total)
//     const updatedTotal = cart.total - cartItem.icecream.price;
//     cart.total =parseFloat(cart.total).toFixed(2);
//     cartItem.total=updatedTotal;
//     // cart.total-=cartItem.price;
//     console.log("Stage 6")
//     await cart.save();
//     console.log("Stage 7")
//     res.json({ message: "Product quantity incremented", cart: cart });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.put("/sub/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    console.log("Cart Api is Working");

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ user: userId });
    console.log("Stage 1");
    if (!cart) {
      cart = new Cart({ user: userId, items: [], total: 0 });
    }

    // Find the cart item corresponding to the productId
    const cartItem = cart.items.find(item => item.icecream.toString() === productId);
    console.log("Stage 2");
    if (!cartItem) {
      return res.status(404).json({ message: "Ice cream is not in cart" });
    } else {
      // Decrement the quantity of the cart item
      cartItem.quantity -= 1;

      if (cartItem.quantity === 0) {
        // Remove the item from the cart's items array
        cart.items = cart.items.filter(item => item.icecream.toString() !== productId);
      }
    }
    console.log("Stage 3");

    // Update the total of the cart
    let updatedTotal = 0;
    for (const item of cart.items) {
      const icecream = await Icecream.findById(item.icecream);
      if (icecream) {
        updatedTotal += icecream.price * item.quantity;
      }
    }

    cart.total = updatedTotal.toFixed(2);

    console.log("Stage 4");
    await cart.save();
    console.log("Stage 5");
    res.json({ message: "Product quantity decremented", cart: cart });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

//for Clear cart
router.put('/:userId/clear', async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the cart doesn't exist, you can consider it already cleared
      return res.status(200).json({ message: "Cart is already empty", cart: cart });
    }

    // Clear the cart by setting items to an empty array and total to 0
    cart.items = [];
    cart.total = 0;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart successfully cleared", cart: cart });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
