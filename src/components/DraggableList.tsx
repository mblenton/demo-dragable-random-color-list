import React from 'react';
import { ColorsList } from '../App';
import { IInitialDnDState } from '../hooks/useDragAndDrop';

import './DraggableList.css';

interface IDraggableList {
  colorsList: ColorsList;
  draggableFuncs: {
    dragAndDrop: IInitialDnDState;
    onDragStart: (event: React.DragEvent<HTMLLIElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
    onDrop: () => void;
    onDragLeave: () => void;
  };
  lastValidColor: string;
}

export const DraggableList = ({
  colorsList,
  draggableFuncs,
  lastValidColor,
}: IDraggableList): JSX.Element => {
  const {
    dragAndDrop,
    onDragStart,
    onDragOver,
    onDrop,
    onDragLeave,
  } = draggableFuncs;
  return (
    <section>
      <ul>
        {colorsList?.map((color, i) => (
          <li
            key={color}
            data-position={i}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className={
              dragAndDrop && dragAndDrop.draggedTo === Number(i)
                ? 'dropArea'
                : ''
            }
            style={{
              color,
              fontWeight: color === lastValidColor ? 'bold' : 'normal',
            }}
          >
            <p>{color}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
