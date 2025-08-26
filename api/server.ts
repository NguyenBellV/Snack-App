import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(bodyParser.json());

// ===== Swagger configuration =====
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products API",
      version: "1.0.0",
      description: "CRUD API for Products with Swagger documentation",
    },
  },
  apis: ["./api/server.ts"], // the file that contains the @swagger comments
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== CRUD API =====

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manage products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               categoryName: { type: string }
 *               images: { type: array, items: { type: string } }
 *               features: { type: array, items: { type: string } }
 *     responses:
 *       201:
 *         description: Product successfully created
 */
app.post("/products", async (req, res) => {
  const { name, price, categoryName, images, features } = req.body;
  if (!name || !price || !categoryName) {
    return res.status(400).json({ error: "Product name, price and category are required" });
  }
  // 🔹 Replace with your Supabase logic
  return res.status(201).json({
    message: "Product created successfully",
    product: { name, price, categoryName, images, features },
  });
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
app.get("/products", async (req, res) => {
  // 🔹 Replace with Supabase select query
  return res.json([{ id: 1, name: "Snack", price: 10000 }]);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 */
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  // 🔹 Replace with supabase.from("products").select("*").eq("id", id)
  return res.json({ id, name: "Snack", price: 10000 });
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               categoryName: { type: string }
 *     responses:
 *       200:
 *         description: Product successfully updated
 */
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  // 🔹 Replace with supabase.from("products").update(body).eq("id", id)
  return res.json({ message: "Product updated successfully", product: { id, ...body } });
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product successfully deleted
 */
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  // 🔹 Replace with supabase.from("products").delete().eq("id", id)
  return res.json({ message: `Product ${id} deleted successfully` });
});

// ===== Run the server =====
app.listen(4004, () => {
  console.log("API Server is running at http://localhost:4004");
  console.log("Swagger Docs available at http://localhost:4004/api-docs");
});
