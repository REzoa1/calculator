import { useEffect } from "react";
import { useAppSelector } from "../store";
import { selectCounter } from "../store/slices/counter";
import { cn } from "../utils/helpers";

export const Display = ({ inputValue, setInputValue }: any) => {
  const { result, operator, warning } = useAppSelector(selectCounter);
  const displayClass = cn(
    "display-container",
    (String(inputValue)?.length > 8 ||
      (String(result)?.length > 8 && !inputValue) ||
      (warning && !inputValue)) &&
      "fs-19"
  );

  const resultToFixed = () => {
    if (String(result)?.length > 17) {
      String(Number(result).toFixed(String(result)?.split(".")[1]?.length));
    }
    return result;
  };

  useEffect(() => {
    if (operator === "=") {
      setInputValue(result);
    }
  }, [result, operator, setInputValue]);

  return (
    <div className={displayClass}>
      {inputValue !== null && !warning ? (
        inputValue
      ) : (
        <span className="result-text">{warning || resultToFixed() || 0}</span>
      )}
    </div>
  );
};
