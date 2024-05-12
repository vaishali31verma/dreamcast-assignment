import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tableData: [],
  loading: false, // Added a default loading state
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setTableData :(state, { payload }) => {
      state.tableData = [...payload];
    },
  },
});

export const {
  setLoading,
  setTableData
} = tableSlice.actions;

export default tableSlice.reducer;

export const fetchUserData = () => async (dispatch) => {
  try {
     const response  = await axios.get('https://jsonplaceholder.typicode.com/users')
     dispatch(setTableData(response.data))
  } catch (error) {
    console.log(error,"error");
  }
};
