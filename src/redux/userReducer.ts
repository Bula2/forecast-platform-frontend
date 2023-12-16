import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';

const AUTH = 'authReducer/AUTH';
const EXIT = 'authReducer/EXIT';

interface IInitialUserState {
  username: string | null;
  user_id: string | null;
}

const initialState: IInitialUserState = {
  username: null,
  user_id: null,
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH: {
      return {
        ...state,
        email: action.data.email,
        password: action.data.password,
      };
    }
    case EXIT: {
      return {
        ...state,
        email: null,
        password: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
