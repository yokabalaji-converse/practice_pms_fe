import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Table } from "./components/Table";

function App() {
  return (
    <BrowserRouter id="yourAppElement">
      <Routes>
        <Route path="/" x element={<Home />} />
        <Route path="table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
