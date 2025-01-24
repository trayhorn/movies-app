import style from './SearchForm.module.css';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
	const navigate = useNavigate();

  const handleSubmit = (e) => {
		e.preventDefault();
		const query = e.target.elements.search.value;
		navigate(`/search?query=${query}`);
	};

  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <input
        className={style.searchInput}
        autoComplete="off"
        type="text"
        name="search"
      />
      <button className={style.searchButton} type="submit">
        Search
      </button>
    </form>
  )
}