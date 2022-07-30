
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import DaftarGereja from "./components/daftarGereja";
import DaftarUser from "./components/daftarUser";
import Login from './components/login'
import Home from './components/home'

function App() {
  return (
  <Router>
      <Routes>
           <Route exact path="/" element={<Login/>}/>
           <Route exact path="/home" element={<Home/>}/>
           <Route exact path="/daftargereja" element={<DaftarGereja/>}/>
           <Route exact path="/daftaruser" element={<DaftarUser/>}/>
             
             
           </Routes>
  </Router>
  );
}

export default App;
