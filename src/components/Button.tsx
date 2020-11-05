import React from 'react';

import './Button.css';

interface IButton {
  fetchData: () => Promise<void>;
  isFetching: boolean;
  lastValidColor: string;
  buttonText: string;
}
export const Button = ({
  fetchData,
  isFetching,
  lastValidColor,
  buttonText,
}: IButton): JSX.Element => (
  <div>
    <button
      style={{
        color: isFetching ? '#000' : lastValidColor ? lastValidColor : '#fff',
      }}
      onClick={fetchData}
    >
      {isFetching ? 'fetching...' : buttonText ? buttonText : 'Get new color'}
    </button>
  </div>
);
