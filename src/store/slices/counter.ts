import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { switchOperators } from "../../utils/switchOperators";
import { RootState } from "./../index";

export interface CounterState {
  warning: string;
  operator: string;
  result: number | null;
}

const initialState: CounterState = {
  warning: "",
  operator: "",
  result: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetCounter: (state) => {
      state.warning = "";
      state.result = 0;
      state.operator = "";
    },

    resetWarning: (state) => {
      state.warning = "";
    },

    increment: (state, action: PayloadAction<number>) => {
      state.warning = "";
      if (state.operator) {
        switchOperators(state, action.payload);
      } else {
        if (state.result !== null) state.result += action.payload;
      }
      state.operator = "+";
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.warning = "";
      if (state.operator) {
        switchOperators(state, action.payload);
      } else {
        state.result !== null && state.operator === "-"
          ? (state.result -= action.payload)
          : (state.result = action.payload);
      }
      state.operator = "-";
    },

    multiply: (state, action: PayloadAction<number>) => {
      state.warning = "";
      if (state.operator) {
        switchOperators(state, action.payload);
      } else {
        state.result !== null && state.operator === "x"
          ? (state.result *= action.payload)
          : (state.result = action.payload);
      }
      state.operator = "x";
    },
    divide: (state, action: PayloadAction<number>) => {
      state.warning = "";
      if (state.operator) {
        switchOperators(state, action.payload);
      } else {
        state.result !== null && state.operator === "/"
          ? (state.result /= action.payload)
          : (state.result = action.payload);
      }
      state.operator = "/";
    },

    setResult: (state, action: PayloadAction<number>) => {
      state.warning = "";
      switchOperators(state, Number(action.payload));

      state.operator = "=";
    },
  },
});

export const {
  increment,
  decrement,
  multiply,
  divide,
  setResult,
  resetCounter,
  resetWarning,
} = counterSlice.actions;

export const selectCounter = (state: RootState) => state["counter"];

export default counterSlice.reducer;
