interface BreedFilterProps {
  selectedBreed: string;
  breeds: Array<{ id: string; name: string }>;
  setSelectedBreed: (breed: string) => void;
  setPage: (page: number) => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({
  selectedBreed,
  breeds,
  setSelectedBreed,
  setPage,
}) => {
  return (
    <div className="my-2 flex items-center justify-center gap-0 sm:my-8 sm:gap-4">
      <label htmlFor="breed-select" className="block text-base sm:text-lg">
        Select Breed:
      </label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => {
          setSelectedBreed(e.target.value);
          setPage(0);
        }}
        className="rounded-md border border-gray-300 px-4 py-2 shadow-input focus:border-mainBcg focus:outline-none"
      >
        <option value="">All Cats</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedFilter;
