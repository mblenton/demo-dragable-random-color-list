import { ColorsList } from '../App';

interface IPushToColorList {
  colorsList: ColorsList;
  newColor: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setLastValidColor: React.Dispatch<React.SetStateAction<string>>;
}
export const pushToColorList = ({
  colorsList,
  newColor,
  setMessage,
  setLastValidColor,
}: IPushToColorList): ColorsList => {
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(newColor)) {
    setMessage(`${newColor} is not valid hex color!`);
    return colorsList;
  }
  if (!colorsList?.includes(newColor)) {
    setLastValidColor(newColor);
    setMessage(`Successfully added hex color ${newColor}`);
    return [...colorsList, newColor];
  } else {
    setLastValidColor(newColor);
    setMessage(`Hex color ${newColor} already exists!`);
  }
  return colorsList;
};
