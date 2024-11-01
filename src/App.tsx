import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import CatGallery from './components/CatGallery';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <CatGallery />
      </div>
    </QueryClientProvider>
  )
}

export default App;