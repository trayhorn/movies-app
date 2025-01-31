import { Formik, Field, Form } from "formik";
import PropTypes from "prop-types";
import style from "./SearchForm.module.css";

export default function SearchForm({ onSubmit, genres }) {
	return (
		<Formik
			initialValues={{
				genres: "",
				release_date_from: "",
				release_date_to: "",
				vote_average: "",
				sort_by: "popularity.desc",
			}}
			onSubmit={(values) => {
				const filteredValues = Object.fromEntries(
					Object.entries(values).filter(([_, value]) => value !== "")
				);
				onSubmit(filteredValues);
			}}
		>
			<Form className={style.form}>
				<label className={style.label}>
					Genre
					<Field component="select" name="genres">
						{genres.map(({ id, name }) => {
							return (
								<option key={id} value={id}>
									{name}
								</option>
							);
						})}
					</Field>
				</label>

				<label className={style.label}>
					Release date from
					<Field type="date" name="release_date_from" />
				</label>
				<label className={style.label}>
					Release date to
					<Field type="date" name="release_date_to" />
				</label>
				<label className={style.label}>
					Vote average
					<Field type="number" name="vote_average" placeholder="From 1 to 10" />
				</label>
				<label className={style.label}>
					Sort by
					<Field component="select" name="sort_by">
						<option value="original_title.asc">Original title ↑</option>
						<option value="original_title.desc">Original title ↓</option>
						<option value="popularity.asc">Popularity ↑</option>
						<option value="popularity.desc">Popularity ↓</option>
						<option value="revenue.asc">Revenue ↑</option>
						<option value="revenue.desc">Revenue ↓</option>
						<option value="primary_release_date.asc">
							Primary release date ↑
						</option>
						<option value="title.asc">title ↑</option>
						<option value="title.desc">title ↓</option>
						<option value="primary_release_date.desc">
							Primary release date ↓
						</option>
						<option value="vote_average.asc">Vote average ↑</option>
						<option value="vote_average.desc">Vote average ↓</option>
						<option value="vote_count.asc">Vote count ↑</option>
						<option value="vote_count.desc">Vote count ↓</option>
					</Field>
				</label>

				<button type="submit">Search</button>
			</Form>
		</Formik>
	);
}


SearchForm.propTypes = {
	onSubmit: PropTypes.func,
	genres: PropTypes.array
};