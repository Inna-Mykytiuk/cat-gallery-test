// export interface Cat {
//   id: string;
//   url: string;
//   breeds: Breed[];
// }

// export interface Breed {
//   id: string;
//   name: string;
//   temperament: string;
// }

// export interface FavoriteCat {
//   id: string;
//   url: string;
// }

export interface Breed {
  id: string;
  name: string;
}

export interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}
