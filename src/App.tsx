import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import CatGallery from "./pages/CatGallery";
import FavoriteCats from "./pages/FavoriteCats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CatGallery />} />
        <Route path="favorites" element={<FavoriteCats />} />
      </Route>
    </Routes>
  );
}

export default App;
