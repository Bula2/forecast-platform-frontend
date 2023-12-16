import { AnyAction } from 'redux';

const GET = 'forecastReducer/GET';

interface IInitialState {
  id: number | null;
  title: string | null;
  subtitle: string | null;
}

const initialState: IInitialState = {
  id: null,
  title: null,
  subtitle: null,
};

const allForecastsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET: {
      return {
        ...state,
        email: action.data.email,
        password: action.data.password,
      };
    }
    default:
      return state;
  }
};

export default allForecastsReducer;
