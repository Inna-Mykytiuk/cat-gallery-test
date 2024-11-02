import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";

const CatGallery = lazy(() => import("./pages/CatGallery"));
const FavoriteCats = lazy(() => import("./pages/FavoriteCats"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Loader = lazy(() => import("./components/Loader"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CatGallery />} />
        <Route path="favorites" element={<FavoriteCats />} />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
