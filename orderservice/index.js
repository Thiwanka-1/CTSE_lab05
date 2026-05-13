const express = require("express");
const app = express();
const PORT = 8082;

app.use(express.json());

// Simple in-memory list
let orders = [];
let idCounter = 1;

// GET /orders - Returns all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// POST /orders - Place a new order
app.post("/orders", (req, res) => {
  const { item, quantity, customerId } = req.body;
  if (!item || !quantity || !customerId) {
    return res
      .status(400)
      .json({ error: "item, quantity, and customerId are required" });
  }
  const newOrder = {
    id: idCounter++,
    item,
    quantity,
    customerId,
    status: "PENDING",
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// GET /orders/:id - Get order by ID
app.get("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find((o) => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
