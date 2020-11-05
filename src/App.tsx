import React, { useState, useEffect } from 'react';
import { useGetRandomColor } from './hooks/useGetRandomColor';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { EnterColor } from './components/EnterColor';
import { Button } from './components/Button';
import { DraggableList } from './components/DraggableList';
import { pushToColorList } from './utils/pushToColorList';
import './App.css';

export type ColorsList = Array<string>;

export const App = (): JSX.Element => {
  const [colorsList, setColorsList] = useState<ColorsList>([]);
  const [message, setMessage] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');
  const [lastValidColor, setLastValidColor] = useState<string>('');
  const { status, data, error, fetchData } = useGetRandomColor();
  const draggableFuncs = useDragAndDrop({ colorsList, setColorsList });
  const isFetching = status === 'fetching';

  useEffect(() => {
    if (status === 'fetched' && data?.new_color) {
      // when entered input text and enter is not pressed -> change button text
      setButtonText('Get new color');
      setColorsList((colorsList) =>
        pushToColorList({
          colorsList,
          newColor: `#${data.new_color}`,
          setMessage,
          setLastValidColor,
        }),
      );
    }
    if (error) {
      setMessage(error);
    }
  }, [status, data, error]);

  return (
    <div className="mainContainer">
      <div className="messageContainer">{message}</div>
      <div className="buttonContainer">
        <Button
          fetchData={fetchData}
          isFetching={isFetching}
          lastValidColor={lastValidColor}
          buttonText={buttonText}
        />
      </div>
      <div className="listContainer">
        <DraggableList
          colorsList={colorsList}
          lastValidColor={lastValidColor}
          draggableFuncs={draggableFuncs}
        />
      </div>
      <div className="enterItemContainer">
        <EnterColor
          setColorsList={setColorsList}
          setMessage={setMessage}
          setButtonText={setButtonText}
          setLastValidColor={setLastValidColor}
        />
      </div>
    </div>
  );
};
