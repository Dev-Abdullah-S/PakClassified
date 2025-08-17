import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import selectedCarReducer from "./slices/selectedCarSlice"; 

const store = configureStore({
  reducer: {
    userInfo: userSlice,
    selectedCar: selectedCarReducer
  }
});

export default store;
