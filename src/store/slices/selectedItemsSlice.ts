import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SelectedItemsState {
  items: string[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
