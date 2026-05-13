const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 8080;

// When running in Docker: service names resolve via Docker network.
// When running locally: falls back to localhost.
const ITEM_SERVICE = process.env.ITEM_SERVICE_URL || "http://localhost:8081";
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || "http://localhost:8082";
const PAYMENT_SERVICE =
  process.env.PAYMENT_SERVICE_URL || "http://localhost:8083";

// Routing rules based on URL path prefix:
// /items/**    → Item Service
// /orders/**   → Order Service
// /payments/** → Payment Service

app.use(
  "/items",
  createProxyMiddleware({
    target: ITEM_SERVICE,
    changeOrigin: true,
  }),
);

app.use(
  "/orders",
  createProxyMiddleware({
    target: ORDER_SERVICE,
    changeOrigin: true,
  }),
);

app.use(
  "/payments",
  createProxyMiddleware({
    target: PAYMENT_SERVICE,
    changeOrigin: true,
  }),
);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running",
    routes: {
      "/items/**": ITEM_SERVICE,
      "/orders/**": ORDER_SERVICE,
      "/payments/**": PAYMENT_SERVICE,
    },
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
