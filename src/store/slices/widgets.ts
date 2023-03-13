import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../index";

export interface WidgetsState {
  widgets: Array<string>;
  isDraggable: boolean;
}
const initialState: WidgetsState = {
  widgets: [],
  isDraggable: true,
};

export const widgetsSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    setWidgets: (state, action: PayloadAction<Array<string>>) => {
      state.widgets = action.payload;
    },
    setIsDraggble: (state, action: PayloadAction<boolean>) => {
      state.isDraggable = action.payload;
    },
  },
});

export const { setWidgets, setIsDraggble } = widgetsSlice.actions;

export const selectWidgets = (state: RootState) => state["widgets"];
export default widgetsSlice.reducer;
