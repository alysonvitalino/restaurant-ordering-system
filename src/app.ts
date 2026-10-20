import express from "express";
import { randomUUID } from "node:crypto";
import supabase from "./config/supabase.js";
import category from "./models/Category.js";
import product from "./models/Product.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";

const app = express();

app.use(express.json());

/*const pizzaCategoryId = randomUUID();
const drinkCategoryId = randomUUID();*/


//root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Restaurant Ordering System API",
    version: "1.0.0",
  });
});

//categorias
/*
const categories = [
  {
    id: pizzaCategoryId,
    name: "Pizzas",
    description:
      "Pizzas salgadas com diferentes sabores, tamanhos e combinações de ingredientes.",
  },
  {
    id: drinkCategoryId,
    name: "Bebidas",
    description:
      "Bebidas para acompanhar as pizzas, incluindo refrigerantes, sucos e água.",
  },
];
//produtos

const products = [
  {
    id: randomUUID(),
    categoryId: pizzaCategoryId,
    name: "Calabresa",
    description:
      "Pizza com molho de tomate, muçarela, calabresa fatiada e cebola.",
    price: 45.9,
  },
  {
    id: randomUUID(),
    categoryId: pizzaCategoryId,
    name: "Frango com Catupiry",
    description:
      "Pizza com molho de tomate, muçarela, frango desfiado e catupiry.",
    price: 49.9,
  },
  {
    id: randomUUID(),
    categoryId: pizzaCategoryId,
    name: "Margherita",
    description:
      "Pizza com molho de tomate, muçarela, tomate e manjericão fresco.",
    price: 44.9,
  },
  {
    id: randomUUID(),
    categoryId: drinkCategoryId,
    name: "Coca-Cola 2L",
    description: "Refrigerante Coca-Cola em garrafa de 2 litros.",
    price: 12.9,
  },
  {
    id: randomUUID(),
    categoryId: drinkCategoryId,
    name: "Suco de Laranja",
    description: "Suco natural de laranja, servido gelado.",
    price: 9.9,
  },
  {
    id: randomUUID(),
    categoryId: pizzaCategoryId,
    name: "Pizza de Chocolate",
    description: "Pizza doce com chocolate cremoso e granulado.",
    price: 39.9,
  },
];

//CATEGORIES

app.get("/categories", (req, res) => {
  res.status(200).json(categories);
});

app.get("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  });

  if (!category) {
    return res.status(404).json({
      message: "Categoria não encontrada.",
    });
  }

  res.status(200).json(category);
});

app.post("/categories", (req, res) => {
  const category = {
    id: randomUUID(),
    ...req.body,
  };
  categories.push(category);
  res.status(201).json(category);
});

// UPDATE CATEGORY
app.put("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  });

  if (!category) {
    return res.status(404).json({
      message: "Categoria não encontrada.",
    });
  }

  category.name = req.body.name;
  category.description = req.body.description;

  res.status(200).json(category);
});

// DELETE CATEGORY
app.delete("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  });

  if (!category) {
    return res.status(404).json({
      message: "Categoria não encontrada.",
    });
  }

  const index = categories.indexOf(category);

  categories.splice(index, 1);

  res.status(200).json({
    message: "Categoria removida com sucesso.",
  });
});

//PRODUCTS

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/products", (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).json(product);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id == req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      message: "Categoria não encontrada.",
    });
  }

  res.status(200).json(product);
});

// UPDATE PRODUCT
app.put("/products/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id == req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado.",
    });
  }


  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;

  res.status(200).json(product);
});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id == req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado.",
    });
  }

  const index = products.indexOf(product)
  products.splice(index, 1);

  res.status(200).json({
    message: "Produto removido com sucesso.",
  });
});

*/
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Erro ao buscar categorias: ", error);

    res.status(404).json({
      message: "Erro ao buscar categorias.",
    });
  }
});
 
app.get("/categories/:id", async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);

    res.status(200).json(categories);
  } catch (error) {
    console.log("Erro ao buscar categoria: ", error);

    res.status(404).json({
      message: "Erro ao buscar categoria.",
    });
  }
});

app.get("/categories/search/:keyword", async (req, res) => {
  try {
    const categories = await Category.findByKeyword(req.params.keyword);

    res.status(200).json(categories);
  } catch (error) {
    console.log("Erro ao pesquisar categoria: ", error);

    res.status(404).json({
      message: "Erro ao buscar categoria.",
    });
  }
});

app.put("/categories/:id", async (req, res) => {
  try {
    const category = await Category.update(req.params.id, req.body);

    res.status(200).json(category);
  } catch (error) {
  console.log("Erro ao atualizar categoria: ", error);

    res.status(404).json({
      message: "Erro ao atualizar categoria.",
    });
  }
})

app.post("/categories", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log("Erro ao criar categoria: ", error);

    res.status(500).json({
      message: "Erro ao criar categoria.",
    });
  }
});

app.delete("/categories/:id", async (req, res) => {
  try {
    const category = await Category.remove(req.params.id);

    res.status(200).json(category);
  } catch (error) {
  console.log("Erro ao deletar categoria: ", error);

    res.status(404).json({
      message: "Erro ao deletar categoria.",
    });
  }
})


app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.log("Erro ao buscar produtos: ", error);

    res.status(500).json({
      message: "Erro ao buscar produtos.",
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log("Erro ao criar produto: ", error);

    res.status(500).json({
      message: "Erro ao criar produto.",
    });
  }
});

app.get("/test-supabase", async (req, res) => {
  const {data, error} = await supabase
  .from("categories")
  .select("*");
  if (error) {
    console.log("Erro ao consultar Supabase: ", error);

    return res.status(500).json({
      sucess: false,
      message: "Erro ao consultar banco de dados",
      error: error.message,
    });
  }
  res.status(200).json({
    succes: true,
    message: "Conexão com Supabase realizada com sucesso!",
    data,
  });
});

export default app;