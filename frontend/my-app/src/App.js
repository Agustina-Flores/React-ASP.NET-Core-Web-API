import logo from "./logo.svg";
import "./App.css";
import Home from "./componentes/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import {Departamento} from "./componentes/Departamento";
import {Empleado} from "./componentes/Empleado";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h3 className="d-flex justify-content-center m-3">React JS Frontend</h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/departamento"
              >
                Departamento
              </NavLink>
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/empleado"
              >
                Empleado
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/departamento" Component={Departamento} />
          <Route path="/empleado" Component={Empleado} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
