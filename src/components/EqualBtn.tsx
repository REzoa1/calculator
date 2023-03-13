import Button from "react-bootstrap/esm/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { selectCounter, setResult } from "../store/slices/counter";
import { selectWidgets } from "../store/slices/widgets";

export const EqualBtn = ({ inputValue, setInputValue }: any) => {
  const dispatch = useAppDispatch();

  const { operator } = useAppSelector(selectCounter);
  const { isDraggable } = useAppSelector(selectWidgets);

  const handleResult = () => {
    if (!inputValue || operator === "=") return;
    dispatch(setResult(Number(inputValue)));
  };

  return (
    <Button
      variant="primary"
      className="equal"
      disabled={isDraggable}
      onClick={handleResult}
    >
      =
    </Button>
  );
};
