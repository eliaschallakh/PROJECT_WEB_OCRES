import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Admin from "./Admin";

import {BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Header/>
          <div className="App">
                  <Routes>
                      <Route exact path="/" element={ <Home />}/>
                      <Route exact path="/Admin" element={ <Admin />}/>
                  </Routes>
            </div>
  </BrowserRouter>
  );
}

export default App;
