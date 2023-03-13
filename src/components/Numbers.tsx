import Button from "react-bootstrap/esm/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { resetWarning } from "../store/slices/counter";
import { selectWidgets } from "../store/slices/widgets";

export const Numbers = ({ inputValue, setInputValue }: any) => {
  const dispatch = useAppDispatch();
  const { isDraggable } = useAppSelector(selectWidgets);
  const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","];

  return (
    <div className="numbers-container">
      {buttons.map((i, index) => (
        <Button
          className={i === 0 ? "long" : ""}
          variant="outline-primary"
          key={index}
          disabled={isDraggable}
          onClick={() => {
            dispatch(resetWarning());
            if (!inputValue || inputValue?.length < 17) {
              setInputValue(
                `${inputValue ? inputValue : ""}${
                  i === "," ? (!inputValue?.includes(".") ? "." : "") : i
                }`
              );
            } else {
              setInputValue(
                String(
                  Number(inputValue).toFixed(
                    String(inputValue)?.split(".")[1]?.length
                  )
                )
              );
            }
          }}
        >
          {i}
        </Button>
      ))}
    </div>
  );
};
