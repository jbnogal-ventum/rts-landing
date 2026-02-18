import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
 isBar: false,
};

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    toggleNode: (state) => {
      state.isBar = !state.isBar;
    },
    setIsBar: (state, action) => {
      state.isBar = action.payload;
    },
  },
});

export const { toggleNode, setIsBar } = nodeSlice.actions;
export default nodeSlice.reducer;

