import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';

const FollowedArtists = () => {
  const { response, error, loading, setLoading, fetchData } = useAxiosPrivate();

  useEffect(() => {
    fetchData({
      url: `me/following?type=artist`,
      method: 'GET'
    });
  }, []);

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Followed Artists</Card.Title>
          <small># of Artists: {response?.artists.total}</small>
        </Card.Header>
        {loading ? (
          <Spinner />
        ) : (
          response &&
          response.artists.items.map((item, index) => (
            <Card.Body key={index}>
              <div>Artist: {item.name} </div>
              <div>Followers: {item.followers.total}</div>
              <div>Genres: {item.genres[0]}</div>
              <Image
                src={
                  item.images.length === 0
                    ? 'src/assets/react.svg'
                    : item.images[0].url
                }
                fluid
                variant="top"
                height="80px"
                width="80px"
              />
              <div>Popularity: {item.popularity}</div>
            </Card.Body>
          ))
        )}
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
};

export default FollowedArtists;
