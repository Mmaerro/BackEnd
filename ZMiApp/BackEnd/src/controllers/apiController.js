// En backend/controllers/externalAPIController.js
import axios from "axios";

const getAllDataFromAPI = async (req, res) => {
  try {
    const limit = req.query.limit || 12; /// Obtener el parámetro de límite de productos

    // Realizar una solicitud GET a la API externa
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );

    // Extraer los datos de la respuesta
    let data = response.data;

    if (limit) {
      data = data.slice(0, parseInt(limit)); // Limitar la cantidad de productos según el parámetro
    }
    // Devolver los datos obtenidos como respuesta
    res.json(data);
  } catch (error) {
    // Manejar errores en caso de que la solicitud falle
    console.error("Error al obtener datos de la API externa:", error);
    res.status(500).json({ error: "Error al obtener datos de la API externa" });
  }
};

export default { getAllDataFromAPI };
