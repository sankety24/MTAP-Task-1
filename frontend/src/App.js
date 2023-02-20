
import "./App.css";

import AllRoute from "./ProductsPages/AllRoute";
import Navbar from "./Components/Navbar";
import { RespNav } from "./Components/respnav";

function App() {
  return (
    <div className="App">
      <div className="resp-nav">
       <RespNav/>
       
      </div>
      <div className="main-nav">   
      <Navbar />
      </div>
      <AllRoute/>
      
    </div>
  );
}

export default App;

