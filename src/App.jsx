import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path='/movies' element={<MoviesPage />}></Route>
      </Routes>
    </>
  )
}

export default App;


