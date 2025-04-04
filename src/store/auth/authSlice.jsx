import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loginStart: (state) => {
      return { ...state, isLoading: true };
    },
    loginSuccess: (state, { payload }) => {
      return {
        ...state,
        userData: payload,
        isLoading: false,
      };
    },
    loginError: (state, { payload }) => {
      return {
        ...state,
        userData: {},
        error: payload,
        isLoading: false,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;
