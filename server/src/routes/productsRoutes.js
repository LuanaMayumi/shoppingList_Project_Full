import express from "express";
import productModels from "../models/productModels.js";

const router = express.Router(); // puxa o método Router para criar a extensão das rotas

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_ERROR_SERVER = 500;

// Método POST
// Post criado para popular o /products
router.post("/", async (req, res) => {
  const { id, name, price, qty_stock } = req.body;

  if (!(id, name, price, qty_stock)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: "Revise os dados digitados",
    });
  }

  try {
    const register = await productModels.create({
      id,
      name,
      price,
      qty_stock,
    });

    return res.status(HTTP_CREATED).json({
      message: "Produto cadastrado com sucesso",
      register,
    });
  } catch (error) {
    res.status(HTTP_ERROR_SERVER).json({
      message: error.message,
    });
  }
});

// Roda toda vez que o /products receber uma req do tipo GET
router.get("/", async (_req, res) => {
  console.log("get na rota principal /products");
  try {
    const products = await productModels.find();
    return res.status(HTTP_OK).json(products);
  } catch (error) {
    res.status(HTTP_ERROR_SERVER).json({
      message: error.message,
    });
  }
});

// Método GET para buscar as infos do produto correspondente ao ID específico
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productById = await productModels.findOne({ id });
    return res.status(HTTP_OK).json(productById);
  } catch (error) {
    res.status(HTTP_ERROR_SERVER).json({
      message: error.message,
    });
  }
});

// Método PUT - para atualizar a quantidade de itens de determinado produto
// é chamado na função updatingProduct
router.put("/", async (req, res) => {
  const { quantity, id } = req.body;

  if (!quantity) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: "Nenhuma quantidade foi inserida",
    });
  }

  // pego o objeto inteiro
  const productById = await productModels.findOne({ id });
  // console.log('antes de subtrair',productById)

  if (productById.qty_stock - quantity < 0) {
    return res.status(400).json({
      message: "Estoque insuficiente",
    });
  }

  if (!productById) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: "Nenhum id foi encontrado",
    });
  }

  // acesso a qty_stock e subtraio o valor da quantidade selecionada pelo user
  productById.qty_stock -= quantity;
  try {
    const updatedQtd = await productById.save(); // atualiza o objeto com a qty de estoque
    res.status(HTTP_OK).json(updatedQtd);
  } catch (error) {
    res.status(HTTP_ERROR_SERVER).json({
      message: error.message,
    });
  }
});

export default router;
