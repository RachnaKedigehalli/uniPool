import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateProvider } from "./StateProvider";

function App() {
  var initialState = {
    isLoggedIn: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setIsLoggedIn":
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
        };
      default:
        return {
          ...state,
        };
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
