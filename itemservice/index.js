const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.json());

// Simple in-memory list
let items = [
  { id: 1, name: "Book" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Phone" },
];
let idCounter = 4;

// GET /items - Returns list of all items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST /items - Create a new item
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Item name is required" });
  }
  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.status(201).json({ message: `Item added: ${name}`, item: newItem });
});

// GET /items/:id - Get item by ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Item Service running on port ${PORT}`);
});
