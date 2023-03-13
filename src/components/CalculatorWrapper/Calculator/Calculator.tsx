import "./Calculator.css";
import { createElement, DragEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectWidgets, setWidgets } from "../../../store/slices/widgets";
import { Map } from "../../../utils/helpers";

export const Calculator = () => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(null);
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const { widgets, isDraggable } = useAppSelector(selectWidgets);

  useEffect(() => {
    if (isDraggable) setInputValue(null);
  }, [isDraggable]);

  const handleDoubleClick = (item: string) => {
    if (!isDraggable) return;
    dispatch(setWidgets(widgets.filter((widget: string) => widget !== item)));
  };

  const handleDragStart = (e: DragEvent, item: string, index: number) => {
    if (item === "display") return;
    e.dataTransfer.setData("widgetType", item);
    setDragItem(index);
  };

  const handleDragOver = (
    e: DragEvent,
    className: string,
    item: string = ""
  ) => {
    if (item === "display") return;
    e.preventDefault();
    e.currentTarget.classList.add(className);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove("vector-before", "vector-after");
  };

  const sortWidgets = () => {
    if (dragItem === null) return;

    const _items = [...widgets];
    const draggedItemContent = _items.splice(dragItem, 1)[0];
    const currentIndex = dragOverItem === null ? _items.length : dragOverItem;
    _items.splice(currentIndex, 0, draggedItemContent);

    setDragItem(null);
    setDragOverItem(null);

    dispatch(setWidgets(_items));
  };

  const dropNewItem = (widgetType: string) => {
    if (widgetType === "display") {
      dispatch(setWidgets([widgetType, ...widgets]));
    } else if (dragOverItem === null) {
      dispatch(setWidgets([...widgets, widgetType]));
    } else {
      let _items = [...widgets];
      _items.splice(dragOverItem, 0, widgetType);
      setDragOverItem(null);
      dispatch(setWidgets(_items));
    }
  };
  const handleOnDrop = (e: DragEvent) => {
    const widgetType = e.dataTransfer.getData("widgetType");
    widgets.some((i) => i === widgetType)
      ? sortWidgets()
      : dropNewItem(widgetType);

    e.currentTarget.classList.remove("vector-before", "vector-after");
  };

  return (
    <>
      {[...widgets].map((item: string, index: number) => (
        <div
          className="item mb-12"
          key={index}
          onDoubleClick={() => handleDoubleClick(item)}
          onDragStart={(e) => handleDragStart(e, item, index)}
          onDragOver={(e) => handleDragOver(e, "vector-before", item)}
          onDragEnter={() => setDragOverItem(index)}
          onDragLeave={handleDragLeave}
          onDrop={handleOnDrop}
          draggable={isDraggable && item !== "display"}
        >
          {createElement(Map[item], { inputValue, setInputValue })}
        </div>
      ))}
      <div
        style={{ height: "100%" }}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => handleDragOver(e, "vector-after")}
        onDrop={handleOnDrop}
        onDragEnter={() => {
          setDragOverItem(null);
        }}
      />
    </>
  );
};
