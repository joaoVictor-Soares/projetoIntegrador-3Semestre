import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Funcionario from "./pages/Funcionario"
import RH from "./pages/RH"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/funcionario" element={<Funcionario />} />
        <Route path="/rh" element={<RH />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;