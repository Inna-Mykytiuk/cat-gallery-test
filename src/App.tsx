// src/App.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CatGallery from './pages/CatGallery';
import FavoriteCats from './pages/FavoriteCats';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<CatGallery />} />
          <Route path="/favorites" element={<FavoriteCats />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;