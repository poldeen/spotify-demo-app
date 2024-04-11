import useAxiosPrivate from 'hooks/useAxiosPrivate';

const API_URL = 'https://api.spotify.com/v1/';

const axiosPrivate = useAxiosPrivate();

const getArtist = async id => {
  const axiosPrivate = useAxiosPrivate();
  try {
    const response = await axiosPrivate.get(`artists/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const getSearchResults = async searchQuery => {
  const spacesRemovedSearchQuery = searchQuery.replace(/\s+/g, '+');
  let isMounted = true;
  const controller = new AbortController();

  try {
    const response = await axiosPrivate.get(
      `search?q=${spacesRemovedSearchQuery}&type=artist&market=US`,
      { signal: controller.signal }
    );
    console.log(response.data);
    isMounted && response.data;
  } catch (err) {
    console.error(err);
  }

  return response;
};

const SpotifyService = {
  getArtist,
  getSearchResults
};

export default SpotifyService;
