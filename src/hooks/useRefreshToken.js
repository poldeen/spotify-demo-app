import axios from 'axios';

const useRefreshToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', token?.refresh_token);

  const refresh = async () => {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: "Content-Type: 'application/x-www-form-urlencoded'"
      }
    );
    localStorage.setItem('token', JSON.stringify(response.data));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
