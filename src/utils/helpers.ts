import { Display } from "../components/Display";
import { EqualBtn } from "../components/EqualBtn";
import { Numbers } from "../components/Numbers";
import { Operators } from "../components/Operators";

export const cn = (...classes: Array<string | boolean>) =>
  [...classes].filter(Boolean).join(" ");

export const Map: {
  [key: string]: ({ formValue, isDraggable }: any) => JSX.Element;
} = {
  display: Display,
  operators: Operators,
  numbers: Numbers,
  equalBtn: EqualBtn,
};
