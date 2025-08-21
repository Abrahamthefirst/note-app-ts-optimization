import {
  createContext,
  useReducer,
  useEffect,
  type ReactNode,
  useContext,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface User {
  id: string;
  email: string;
  [index: string]: any;
}

type State = {
  accessToken: string | null;
  user: User | null;
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    accessToken: string;
    user: User;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type AuthAction = LoginAction | LogoutAction;

function reducer(state: State, action: AuthAction): State {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(
        'note-app:token',
        JSON.stringify(action?.payload?.accessToken)
      );
      localStorage.setItem(
        'note-app:user',
        JSON.stringify(action?.payload?.user)
      );

      return {
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    case 'LOGOUT':
      localStorage.removeItem('note-app:token');
      localStorage.removeItem('note-app:user');
      return { accessToken: null, user: null };
    default:
      return state;
  }
}

interface AuthContextType {
  state: State;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
  state: {
    accessToken: null,
    user: null,
  },
  dispatch: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [storedAccessToken, setStoredAccessToken] = useLocalStorage<
    string | null
  >('note-app:token', '');
  const [storedUser, setStoredUser] = useLocalStorage<User | null>(
    'note-app:user',
    null
  );

  const initialState: State = {
    accessToken: storedAccessToken,
    user: storedUser,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setStoredAccessToken(state.accessToken);
    setStoredUser(state.user);
  }, [state.accessToken, state.user, setStoredAccessToken, setStoredUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return { state, dispatch };
};
