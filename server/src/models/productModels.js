import mongoose from "mongoose";

// SCHEMA - objeto referente à collection criada no cloud
const productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty_stock: {
    type: Number,
    required: true,
  },
});

// exportando productSchema, relacionado à collection "Products" (Cloud)
export default mongoose.model("Products", productSchema);
