import './App.css';
import { Route, Routes } from 'react-router-dom';
import Formulaire from './pages/formulaire';
import Home from './pages/home';
import Error from './pages/error';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Formulaire/>}/>
      <Route path="/alicia" element={<Home />}/>
      <Route path="*" element={<Error/>}></Route>
    </Routes>
  );
}

export default App;
