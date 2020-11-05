import { useState } from 'react';
import { ColorsList } from '../App';

export interface IInitialDnDState {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: ColorsList;
  updatedOrder: ColorsList;
}

interface IUseDragAndDrop {
  colorsList: ColorsList;
  setColorsList: React.Dispatch<React.SetStateAction<ColorsList>>;
}

interface IRUseDragAndDrop {
  onDragStart: (event: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
  onDrop: () => void;
  onDragLeave: () => void;
  dragAndDrop: IInitialDnDState;
}
export const useDragAndDrop = ({
  colorsList,
  setColorsList,
}: IUseDragAndDrop): IRUseDragAndDrop => {
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };

  const [dragAndDrop, setDragAndDrop] = useState<IInitialDnDState>(
    initialDnDState,
  );

  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: [...colorsList],
    });
  };

  const onDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();

    let newList: ColorsList = [...dragAndDrop.originalOrder];

    const draggedFrom = dragAndDrop.draggedFrom;

    const draggedTo = Number(event.currentTarget.dataset.position);
    // @ts-ignore
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom,
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    setColorsList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  return { onDragStart, onDragOver, onDrop, onDragLeave, dragAndDrop };
};
