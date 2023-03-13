import "./CalculatorWrapper.css";
import { DragEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ReactComponent as ImgIcon } from "./../../assets/svg/img.svg";
import { selectWidgets, setWidgets } from "../../store/slices/widgets";
import { Calculator } from "./Calculator/Calculator";

export const CalculatorWrapper = () => {
  const dispatch = useAppDispatch();
  const { widgets } = useAppSelector(selectWidgets);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("lightblue-bg");
  };

  const handleDragLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove("lightblue-bg");
  };

  const handleOnDrop = (e: DragEvent) => {
    const widgetType = e.dataTransfer.getData("widgetType") as any;

    dispatch(setWidgets([...widgets, widgetType]));
  };

  return !widgets.length ? (
    <div
      className="loader"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleOnDrop}
    >
      <ImgIcon />
      <div>Перетащите сюда</div>
      <div className="loader-subtitle">любой элемент из левой панели</div>
    </div>
  ) : (
    <div className="loader-fill">
      <Calculator />
    </div>
  );
};
