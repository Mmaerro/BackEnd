import { Router } from "express";
const productRouter = Router();

productRouter.get("/prods", async (req, res) => {
  res.send("mensaje");
});

export default productRouter;
