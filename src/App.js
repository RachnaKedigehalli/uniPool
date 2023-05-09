import "./App.css";

import { StateProvider } from "./StateProvider";

import AppRoutes from "./AppRoutes";

function App() {
  var initialState = {
    isLoggedIn: false,
    user: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setIsLoggedIn":
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
        };
      case "setUser":
        return {
          ...state,
          user: action.payload.user,
        };
      default:
        return {
          ...state,
        };
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <>
        <AppRoutes />
      </>
    </StateProvider>
  );
}

export default App;
