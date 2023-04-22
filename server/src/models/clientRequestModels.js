import mongoose from "mongoose";

// SCHEMA - objeto referente à collection criada no cloud
const clientRequestSchema = mongoose.Schema({
  name_client: {
    type: String,
    required: true,
  },
  delivery: {
    type: Date,
    required: true,
  },
  productsList:{
    type: Array,
    required: true,
  },
  totalValue:{
    type: Number,
    required: true
  }
})

// exportando clientRequestSchema, relacionado à collection "clients" (Cloud)
export default mongoose.model("Clients", clientRequestSchema)