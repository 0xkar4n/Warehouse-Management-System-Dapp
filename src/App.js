
import Navbar from './components/navbar';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Manage from './components/Manage';
import Main from './components/Main';
const App = () => {
  return (
    <div>
      <Navbar />
      
      <div>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/ManageWarehouse" element={<Manage />} />
          <Route path="/ManageWarehouse/:childAddress" element={<Main />} />


        </Routes>
        
      </div>
      
    </div>
  );
};

export default App;