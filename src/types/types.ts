export type ListType = {
  id: number;
  name: string;
}

export type MovieToRender = {
	id: string;
  poster_path: string;
  genre_ids: number[];
	title: string;
	release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
};

export type CastCard = {
	id: number;
	name: string;
	profile_path: string;
  character: string;
};

export type Genre = { id: number; name: string };

export type Video = {
  type: string;
  name: string;
  key: string;
}

export type MovieDetailsType = {
	id: number;
	poster_path: string;
	original_title: string;
	overview: string;
	budget: string;
	genres: Genre[];
	release_date: string;
	videos: { results: Video[] };
};

export type SearchFormType = {
  genres?: string;
  release_date_from?: string;
  release_date_to?: string;
  vote_average?: string;
  sort_by?: string;
}