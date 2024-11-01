import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import CatGallery from './components/CatGallery';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        {/* <BreedFilter /> */}
        <CatGallery />
        {/* <h2 className="text-2xl font-bold mt-8">Favorite Cats</h2> */}
        {/* <Favorites /> */}
      </div>
    </QueryClientProvider>
  )
}

export default App;