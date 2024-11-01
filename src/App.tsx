import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
// import CatGallery from './pages/CatGallery';
// import FavoriteCats from './pages/FavoriteCats';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Test />} />
        {/* <Route index element={<CatGallery />} />
        <Route path="favorites" element={<FavoriteCats />} /> */}
      </Route>
    </Routes>
  );
}

export default App;