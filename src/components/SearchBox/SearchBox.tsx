import { FormEvent } from "react";
import style from "./SearchBox.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const query =
			(form.elements.namedItem('search') as HTMLInputElement).value;

		navigate(`/search?query=${query}`);
	};

	return (
		<form className={style.SearchBox} onSubmit={handleSubmit}>
			<input
				required
				className={style.searchInput}
				autoComplete="off"
				type="text"
				name="search"
			/>
			<button className={style.searchButton} type="submit">
				Search
			</button>
		</form>
	);
}
