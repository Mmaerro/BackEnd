import { Schema, model } from "mongoose";

// Generar modelo de carrito
const cartSchema = new Schema({
    products: {
        type: [
        {
            id_prod: {
            type: Schema.Types.ObjectId,
            ref: "products",
            },
            cant: Number,
        },
        ],
        default: [],
    },
});

const CartModel = model("Cart", cartSchema); // Nombre del modelo: "Cart"

export default CartModel; // Exportar el modelo correctamente
