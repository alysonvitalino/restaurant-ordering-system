import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Restaurant Ordering System API",
    version: "1.0.0",
  });
});

app.get("/categories", (req, res) => {
  res.status(200).json({
    message: "Lista de Categorias",
  });
});

app.get("/products", (req, res) => {
  res.status(200).json({
    message: "Lista de produtos",
  });
});

export default app;
