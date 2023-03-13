import "./Switch.css";
import { createElement } from "react";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetCounter } from "../../store/slices/counter";
import {
  selectWidgets,
  setIsDraggble,
  setWidgets,
} from "../../store/slices/widgets";
import { initialWidgets } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import { ReactComponent as RuntimeLogo } from "./../../assets/svg/eye.svg";
import { ReactComponent as ConstructorLogo } from "./../../assets/svg/brackets.svg";

export const Switch = () => {
  const dispatch = useAppDispatch();
  const { widgets, isDraggable } = useAppSelector(selectWidgets);

  const radios = [
    { name: "Runtime", icon: RuntimeLogo, draggable: false },
    { name: "Constructor", icon: ConstructorLogo, draggable: true },
  ];

  const handleChange = () => {
    dispatch(setIsDraggble(!isDraggable));
    !widgets.length && dispatch(setWidgets(initialWidgets));

    dispatch(resetCounter());
  };

  return (
    <ButtonGroup className="group">
      {radios.map((radio, idx) => {
        const { name, draggable, icon } = radio;
        const className = cn("logo", draggable === isDraggable && "active");
        return (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-light"
            value={String(isDraggable)}
            checked={isDraggable === draggable}
            onChange={handleChange}
          >
            {createElement(icon, { className })}
            {name}
          </ToggleButton>
        );
      })}
    </ButtonGroup>
  );
};
