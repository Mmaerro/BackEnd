import ItemListContainer from "./Components/itemListContainer/ItemListContainer";
import Navbar from "./Components/NavBar/NavBar";
import Error from "./Components/Error/Error";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
