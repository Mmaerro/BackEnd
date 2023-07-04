import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styleList.css";
import ItemList from "../ItemList/ItemList.jsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Loading from "../LoadCards/LoadCards";
const ItemListContainer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(" http://localhost:4020/api/app/data");
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    // Simulación de tiempo de espera para mostrar el componente de carga
    setTimeout(() => {
      // Cambiar el estado isLoading a false para indicar que se ha cargado la respuesta
      setIsLoading(false);
    }, 2000); // Tiempo d
    fetchData();
  }, []);

  return (
    <main className="rounded main-container">
      {isLoading ? (
        <Loading />
      ) : (
        // Mostrar el componente ItemList una vez que se haya cargado la respuesta
        <ItemList data={data} />
      )}
    </main>
  );
};

export default ItemListContainer;
