// En backend/routes/apiRoutes.js
import { Router } from "express";
import apiControl from "../controllers/apiController.js";

const apiRouter = Router();

// Ruta para obtener datos de la API externa
apiRouter.get("/data", apiControl.getAllDataFromAPI);

export default apiRouter;
