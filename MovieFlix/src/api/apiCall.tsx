export const fetchMovies = async (pagination: object) => {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${pagination.page}&page=1&vote_count.gte=100&with_genres=${pagination.selectedFilter}`;

  try {
    const response = await fetch(url, options);
    const response_1 = await response.json();
    console.log('api', response_1);
    return response_1;
  } catch (err) {
    return console.error(err);
  }
};

export async function fetchGenreList() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=2dca580c2a14b55200e784d157207b4d',
      options,
    );
    const response_1 = await response.json();
    return response_1;
  } catch (err) {
    return console.error(err);
  }
}
