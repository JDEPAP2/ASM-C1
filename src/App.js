import Home from './main/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Place from './main/Place';
import Info from './main/Info';

function App() {
  const places = require("./media/data/places.json")
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home places={places}/>}/>
        <Route exact path="/Place/:id" element={<Place places={places}/>}/>
        <Route exact path="/Info/" element={<Info/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
