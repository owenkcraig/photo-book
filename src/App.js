import './App.css';
import { Route, Routes } from 'react-router-dom';

import ArtIndex from './ArtIndex';
import MaterialGallery from './MaterialGallery';

function App() {

  return (
    <div className="App">
      <h1>Art</h1>

      <Routes>
        <Route 
          path="/" 
          element={ <ArtIndex /> } 
        />
        <Route 
          path="/material/:materialName" 
          element={ <MaterialGallery /> } 
        />
      </Routes>
    </div>
  );
}

export default App;
