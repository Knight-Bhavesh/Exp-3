import { createSlice } from '@reduxjs/toolkit';

const TICKET_PRICE = 250; // default ticket price

const storedHistory = localStorage.getItem('bookingHistory');
const initialState = {
  selectedSeats: [],
  showTime: null,
  movieId: null,
  totalPrice: 0,
  history: storedHistory ? JSON.parse(storedHistory) : [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seatId = action.payload;
      const index = state.selectedSeats.indexOf(seatId);
      if (index === -1) {
        state.selectedSeats.push(seatId);
      } else {
        state.selectedSeats.splice(index, 1);
      }
      state.totalPrice = state.selectedSeats.length * TICKET_PRICE;
    },
    setShowTime: (state, action) => {
      state.showTime = action.payload.time;
      state.movieId = action.payload.movieId;
    },
    confirmBooking: (state, action) => {
      const bookingRecord = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        ...action.payload
      };
      state.history.unshift(bookingRecord);
      localStorage.setItem('bookingHistory', JSON.stringify(state.history));
      
      state.selectedSeats = [];
      state.showTime = null;
      state.movieId = null;
      state.totalPrice = 0;
    },
    clearBooking: (state) => {
      state.selectedSeats = [];
      state.showTime = null;
      state.movieId = null;
      state.totalPrice = 0;
    }
  }
});

export const { toggleSeat, setShowTime, clearBooking, confirmBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
