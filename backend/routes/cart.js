const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//get cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    res.json(cart?.products || []);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

//add item
router.post("/add", protect, async (req, res) => {
  try {
    const { id, title, price, thumbnail } = req.body;

    let cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        products: [],
      });
    }

    const existingProduct = cart.products.find((p) => p.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        id,
        title,
        price,
        thumbnail,
        quantity: 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

//remove item
router.delete("/:id", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    cart.products = cart.products.filter(
      (item) => item.id !== Number(req.params.id),
    );

    await cart.save();

    res.json(cart.products);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

//clear cart
router.delete("/", protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { products: [] });

    res.json({
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;

//update cart
router.put("/update", protect, async (req, res) => {
  try {
    const { productId, delta } = req.body;

    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const product = cart.products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.quantity += delta;

    if (product.quantity < 1) {
      product.quantity = 1;
    }

    await cart.save();

    res.json(cart.products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});