import { createSlice } from '@reduxjs/toolkit';

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
    rating: 8.8,
    genre: ['Sci-Fi', 'Action'],
    language: 'English',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    duration: '2h 28m'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop',
    rating: 9.0,
    genre: ['Action', 'Crime'],
    language: 'English',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    duration: '2h 32m'
  },
  {
    id: 3,
    title: 'Interstellar',
    poster: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2011&auto=format&fit=crop',
    rating: 8.6,
    genre: ['Sci-Fi', 'Adventure'],
    language: 'English',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    duration: '2h 49m'
  },
  {
    id: 4,
    title: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop',
    rating: 8.8,
    genre: ['Sci-Fi', 'Action'],
    language: 'English',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    duration: '2h 46m'
  },
  {
    id: 5,
    title: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1974&auto=format&fit=crop',
    rating: 8.7,
    genre: ['Animation', 'Action'],
    language: 'English',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac'],
    duration: '2h 20m'
  },
  {
    id: 6,
    title: 'Avengers: Endgame',
    poster: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=1974&auto=format&fit=crop',
    rating: 8.4,
    genre: ['Action', 'Sci-Fi'],
    language: 'English',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    duration: '3h 1m'
  }
];

const initialState = {
  movies: mockMovies,
  searchTerm: '',
  filters: {
    genre: 'All',
    language: 'All'
  },
  selectedMovie: null
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = value;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    }
  }
});

export const { setSearchTerm, setFilter, setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
