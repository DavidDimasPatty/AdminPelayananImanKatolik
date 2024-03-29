
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import DaftarGereja from "./components/daftarGereja";
import DaftarUser from "./components/daftarUser";
import Login from './components/login'
import Home from './components/home'
import EditGereja from "./components/editGereja";
import AddGereja from "./components/addGereja";
import ChangePassword from "./components/changePassword";
import Error from "./components/error";
import DaftarImam from "./components/daftarImam";

function App() {
  return (
  <Router>
      <Routes>
           <Route exact path="/" element={<Login/>}/>
           <Route exact path="/home" element={<Home/>}/>
           <Route exact path="/daftargereja" element={<DaftarGereja/>}/>
           <Route exact path="/daftaruser" element={<DaftarUser/>}/>
           <Route exact path="/daftarimam" element={<DaftarImam/>}/>
           <Route exact path="/editgereja/:id" element={<EditGereja/>}/>
           <Route exact path="/pageaddgereja" element={<AddGereja/>}/>
           <Route exact path="/pageForgotPassword/:email" element={<ChangePassword/>}/>
           <Route exact path="/error" element={<Error/>}/>
           </Routes>
  </Router>
  );
}

export default App;
