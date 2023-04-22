import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./src/routes/productsRoutes.js";
import clientRequestRoutes from "./src/routes/clientRequestRoutes.js";
import cors from "cors"; // LIBERA O ACESSO DA API PARA O FRONT

dotenv.config(); // da acesso do arquivo .env para o PROCESS.ENV
const app = express();

app.use(cors());
app.use(express.json());

// ENDPOINTS API
app.use("/products", productRoutes);
app.use("/client-request", clientRequestRoutes);

const dbMongo = process.env.CONNECTION_URL;
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
  mongoose
    .connect(dbMongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Contectado ao MongoDB");
    })
    .catch((error) => console.log(error.message));
});
