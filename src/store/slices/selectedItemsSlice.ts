import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IPeopleResponse } from '../../services/types.ts';

interface SelectedItemsState {
  items: IPeopleResponse[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<IPeopleResponse>) => {
      state.items.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
