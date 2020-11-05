import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ColorsList } from '../App';
import { pushToColorList } from '../utils/pushToColorList';

import './EnterColor.css';

interface IProps {
  setColorsList: React.Dispatch<React.SetStateAction<ColorsList>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  setLastValidColor: React.Dispatch<React.SetStateAction<string>>;
}

export const EnterColor = ({
  setColorsList,
  setMessage,
  setButtonText,
  setLastValidColor,
}: IProps): JSX.Element => {
  const [color, setColor] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    setButtonText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setColorsList((colorsList) =>
      pushToColorList({
        colorsList,
        newColor: color,
        setMessage,
        setLastValidColor,
      }),
    );
    setColor('');
    setButtonText('');
  };

  return (
    <div className="addColor">
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          minLength={4}
          // pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
          value={color}
          autoComplete="off"
          name="color"
          onChange={handleChange}
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'Add new hex color')}
          placeholder="Add new hex color"
        />
        <button type="submit" />
      </form>
    </div>
  );
};
