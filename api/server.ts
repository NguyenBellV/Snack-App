import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(bodyParser.json());

// ===== Swagger Configuration =====
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products API",
      version: "1.0.0",
      description: "CRUD API cho Products với Swagger docs",
    },
  },
  apis: ["./api/server.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== CRUD API =====

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tạo sản phẩm mới
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
 *         description: Sản phẩm được tạo thành công
 */
app.post("/products", async (req, res) => {
  const { name, price, categoryName, images, features } = req.body;
  if (!name || !price || !categoryName) {
    return res.status(400).json({ error: "Tên sản phẩm, giá và danh mục là bắt buộc" });
  }
  // 🔹 Ở đây bạn thay bằng logic Supabase giống trong route.ts
  return res.status(201).json({ message: "Product created successfully", product: { name, price, categoryName, images, features } });
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 */
app.get("/products", async (req, res) => {
  // 🔹 Thay bằng supabase select
  return res.json([{ id: 1, name: "Snack", price: 10000 }]);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Lấy sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Một sản phẩm
 */
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  // 🔹 supabase.from("products").select("*").eq("id", id)
  return res.json({ id, name: "Snack", price: 10000 });
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm theo ID
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
 *         description: Sản phẩm được cập nhật
 */
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  // 🔹 supabase.from("products").update(body).eq("id", id)
  return res.json({ message: "Product updated successfully", product: { id, ...body } });
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa
 */
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  // 🔹 supabase.from("products").delete().eq("id", id)
  return res.json({ message: `Product ${id} deleted successfully` });
});

// ===== Chạy server =====
app.listen(4000, () => {
  console.log("API Server chạy tại http://localhost:4000");
  console.log("Swagger Docs: http://localhost:4000/api-docs");
});
