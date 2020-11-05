import { useReducer } from 'react';

const GET_RANDOM_COLOR_URL = 'http://www.colr.org/json/color/random';

export interface IData {
  new_color: string;
}

type Status = 'idle' | 'fetching' | 'fetched' | 'error';

interface IState {
  status: Status;
  data?: IData;
  error?: string;
}

type Actions = 'FETCHING' | 'FETCHED' | 'FETCH_ERROR';

interface IAction {
  type: Actions;
  payload?: IData | undefined;
  error?: string;
}

interface IRUseGetRandomColor {
  fetchData: () => Promise<void>;
  status: Status;
  data?: IData | undefined;
  error?: string | undefined;
}

export const useGetRandomColor = (): IRUseGetRandomColor => {
  const initialState = {
    status: 'idle' as Status,
  };

  const [state, dispatch] = useReducer(
    (state: IState, action: IAction): IState => {
      switch (action.type) {
        case 'FETCHING':
          return { ...initialState, status: 'fetching' };
        case 'FETCHED':
          return {
            ...initialState,
            status: 'fetched',
            data: action.payload,
          };
        case 'FETCH_ERROR':
          return {
            ...initialState,
            status: 'error',
            error: action.error,
          };
        default:
          return state;
      }
    },
    initialState,
  );

  const requestOptions = {
    headers: {
      'Content-Type': 'text/plain',
    },
    method: 'GET',
    cors: 'no-cors',
    cache: 'no-cache',
  };

  if (!GET_RANDOM_COLOR_URL) {
    dispatch({ type: 'FETCH_ERROR', error: 'No URL provided!' });
  }

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCHING' });
      // @ts-ignore
      const response = await fetch(GET_RANDOM_COLOR_URL, requestOptions);
      const data: IData = await response.json();
      if (data?.new_color.length) {
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        dispatch({
          type: 'FETCH_ERROR',
          error: 'Fetched with success but empty data provided!',
        });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', error: error.message });
    }
  };

  return { ...state, fetchData };
};
