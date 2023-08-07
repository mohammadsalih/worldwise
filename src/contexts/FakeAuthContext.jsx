import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Mohammad",
  email: "mohammadsalih.main@gmail.com",
  password: "mh0789hjdss",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const FakeAuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "user/logout":
      return {
        ...state,
        user: initialState.user,
        isAuthenticated: initialState.isAuthenticated,
      };

    default:
      throw new Error("Invalid action");
  }
}

function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "user/login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <FakeAuthContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(FakeAuthContext);

  if (context === undefined)
    throw new Error(
      "Cities context was used outside of FakeAuthProvider"
    );

  return context;
}

export { FakeAuthProvider, useFakeAuth };
