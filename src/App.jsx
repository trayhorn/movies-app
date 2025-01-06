import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {

  return (
		<>
			<header>
				<Link to={"/"}>Home</Link>
				<Link to={"/movies"}>Movies</Link>
			</header>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/movies" element={<MoviesPage />}></Route>
			</Routes>
		</>
	);
}

export default App;


