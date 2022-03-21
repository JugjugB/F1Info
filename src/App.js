import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Page Components/Navbar';
import Teams from './Pages/Teams'
import Results from './Pages/Results'
import Qualifying from './Pages/Qualifying';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Router>
          <Routes>
            <Route path="/" element={<Teams />}></Route>
            <Route path="/results" element={<Results />}></Route>
            <Route path="/qualifying" element={<Qualifying />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
      
  );
}

export default App;
