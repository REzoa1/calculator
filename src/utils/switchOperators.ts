export const switchOperators = (state: any, payload: any) => {
  switch (state.operator) {
    case "+":
      state.result += payload;
      break;
    case "-":
      state.result -= payload;
      break;
    case "x":
      state.result *= payload;
      break;

    case "/":
      if (payload === 0) {
        state.warning = "Не определено";
        state.result = null;
      } else {
        state.result /= payload;
      }
      break;

    case "=":
      state.result = payload;
      break;
  }
  state.operator = "";
};
