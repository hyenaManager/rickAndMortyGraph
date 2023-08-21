import "./App.css";
import Characters from "./components/characters";
import { Outlet, Route, Routes } from "react-router-dom";
import CharacterDetail from "./components/profile";

function App() {
  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/detail/:characterId" element={<CharacterDetail />} />
      </Routes>
    </>
  );
}

export default App;
