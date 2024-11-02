export interface Breed {
  id: string;
  name: string;
  temperament?: string;
  description?: string;
  life_span?: string;
}

export interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}
