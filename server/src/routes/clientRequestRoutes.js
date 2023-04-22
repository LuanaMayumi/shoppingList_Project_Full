import express from "express";
import clientRequestModels from "../models/clientRequestModels.js";

const router = express.Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_ERROR_SERVER = 500;

// Método POST - para salvar a lista com as infos do Body digitadas pelo usuario
router.post("/", async (req, res) => {
  const { name_client, delivery, productsList, totalValue } = req.body;

  if (!(name_client, delivery, productsList, totalValue)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: "Revise os dados digitados",
    });
  }

  try {
    const saveData = await clientRequestModels.create({
      // mongoose
      name_client,
      delivery,
      productsList,
      totalValue,
    });
    res.status(HTTP_CREATED).json({
      message: "Pedido salvo no banco de dados com sucesso",
      saveData,
    });
  } catch (error) {
    res.status(HTTP_ERROR_SERVER).json({
      message: error.message,
    });
  }
});

// Método GET, para acessar as infos do endpoint /client-request
router.get("/", async (req, res) => {
  try {
    const request = await clientRequestModels.find(); // qdo eu uso o model, tenho os métodos do mongoose
    res.status(HTTP_OK).json(request);
  } catch (error) {
    res.status(HTTP_ERROR_SERVER).json({ message: error.message });
  }
});

export default router;
