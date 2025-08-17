import { createSlice } from "@reduxjs/toolkit";

const selectedCarSlice = createSlice({
  name: "selectedCar",
  initialState: {
    car: null, // will store the selected car object
  },
  reducers: {
    setSelectedCar: (state, action) => {
      state.car = action.payload;
    },
    clearSelectedCar: (state) => {
      state.car = null;
    },
  },
});

export const { setSelectedCar, clearSelectedCar } = selectedCarSlice.actions;
export default selectedCarSlice.reducer;
