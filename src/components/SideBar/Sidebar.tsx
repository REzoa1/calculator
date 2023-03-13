import { createElement, DragEvent } from "react";
import { useAppSelector } from "../../store";
import { selectWidgets } from "../../store/slices/widgets";
import { initialWidgets } from "../../utils/constants";
import { cn, Map } from "../../utils/helpers";

export const Sidebar = () => {
  const { widgets, isDraggable } = useAppSelector(selectWidgets);

  const handleOnDrag = (e: DragEvent, widgetType: string) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  return (
    <>
      {initialWidgets.map((item: string, index: number) => {
        const isOnBoard = widgets?.some((el: string) => el === item);
        const className = cn(
          "item user-select-none shadow",
          index !== initialWidgets.length - 1 && "mb-12",
          isOnBoard && "opacity-50"
        );

        return (
          isDraggable && (
            <div
              key={index}
              className={className}
              draggable={!isOnBoard}
              onDragStart={(e) => handleOnDrag(e, item)}
            >
              {createElement(Map[item], { inputValue: null })}
            </div>
          )
        );
      })}
    </>
  );
};
