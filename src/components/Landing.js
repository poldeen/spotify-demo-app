import axios from 'axios';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useAuth } from 'providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { useSearchParams } from 'react-router-dom';
import AuthServicePKCE from 'services/spotifyPKCEAuth.service';

const Landing = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const token = localStorage.getItem('token');
  const { response, loading, fetchData } = useAxiosPrivate();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { auth, setAuth } = useAuth();

  /* const [myParams, setMyParams] = useSearchParams();

  useEffect(() => {
    myParams.delete('code');
    setMyParams(myParams);
  }, [loaded]);
 */
  useEffect(() => {
    if (code !== null && !token) {
      fetchTokenNew();
    }
  }, []);

  const fetchTokenNew = async () => {
    try {
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const verifier = localStorage.getItem('verifier');

      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', 'http://localhost:3000');
      params.append('code_verifier', verifier);

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        params,
        {
          headers: "Content-Type: 'application/x-www-form-urlencoded'"
        }
      );

      localStorage.setItem('token', JSON.stringify(response.data));
      setAuth({ loggedIn: true });
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loaded) {
      console.log('trying to run');
      fetchUser();
    }
  }, [loaded]);

  const fetchUser = async () => {
    await fetchData({
      url: `me`,
      method: 'GET'
    });
  };

  useEffect(() => {
    if (user === null) {
      localStorage.setItem('user', JSON.stringify(response));
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [response]);

  const handleSubmit = () => {
    AuthServicePKCE.login();
  };
  return (
    <>
      <Card className="m-3">
        <Card.Header>
          <Card.Title>Landing Page</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>Text about the intent of the current app</Card.Text>
          <Card.Text>{token !== null ? 'Token Received' : null}</Card.Text>
          <Card.Text>{user?.display_name}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {auth.loggedIn ? (
            <Link to="spotify">
              <Button>Let's Go</Button>
            </Link>
          ) : (
            <Button disabled={loaded} onClick={handleSubmit}>
              Launch Spotify
            </Button>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Landing;
