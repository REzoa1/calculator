import Button from "react-bootstrap/esm/Button";
import { useAppDispatch, useAppSelector } from "../store";
import {
  increment,
  decrement,
  multiply,
  divide,
  resetWarning,
} from "../store/slices/counter";
import { selectWidgets } from "../store/slices/widgets";

export const Operators = ({ inputValue, setInputValue }: any) => {
  const { isDraggable } = useAppSelector(selectWidgets);
  const dispatch = useAppDispatch();
  const operators = ["/", "x", "-", "+"];

  return (
    <div className="operators-container">
      {operators.map((i, index) => {
        return (
          <Button
            key={index}
            className="operators"
            variant="outline-primary"
            disabled={isDraggable}
            onClick={() => {
              if (inputValue === null) return;

              dispatch(resetWarning());
              switch (i) {
                case "+":
                  dispatch(increment(Number(inputValue)));
                  setInputValue(null);
                  break;
                case "-":
                  dispatch(decrement(Number(inputValue)));
                  setInputValue(null);
                  break;
                case "x":
                  dispatch(multiply(Number(inputValue)));
                  setInputValue(null);
                  break;
                case "/":
                  dispatch(divide(Number(inputValue)));
                  setInputValue(null);
                  break;
              }
            }}
          >
            {i}
          </Button>
        );
      })}
    </div>
  );
};
