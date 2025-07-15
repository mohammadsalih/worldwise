import { createContext, useContext, useState } from "react";

// Create context
const FakeAuthContext = createContext();

// Fake user data
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Provider component
function FakeAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(email, password) {
    // Simulate a login process
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      setUser(FAKE_USER);
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid credentials");
    }
  }

  function logout() {
    // Simulate a logout process
    setUser({});
    setIsAuthenticated(false);
  }

  return (
    <FakeAuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

// Custom hook to use context
function useFakeAuthContext() {
  const context = useContext(FakeAuthContext);

  if (!context)
    throw new Error(
      "useFakeAuthContext must be used within a FakeAuthContextProvider"
    );

  return context;
}

// Export provider and hook
export { FakeAuthContextProvider, useFakeAuthContext };
