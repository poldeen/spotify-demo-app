import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Card, Image, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopArtists = () => {
  const { response, error, loading, setLoading, fetchData } = useAxiosPrivate();

  useEffect(() => {
    fetchData({
      url: `me/top/artists`,
      method: 'GET'
    });
  }, []);
  return (
    <Card className="mb-3">
      <Card.Header>Top Artists: {response?.total}</Card.Header>
      <ListGroup>
        {loading ? (
          <Spinner />
        ) : (
          response &&
          response.items.map((item, index) => (
            <ListGroup.Item
              key={index}
              data-bs-theme="light"
              as={Link}
              to="#!"
              action
            >
              <h5 className="mb-1">{item.name}</h5>

              <div>
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
              </div>

              <div>
                <div className="fs-10">Followers: {item.followers.total}</div>
                <div className="fs-10">Popularity: {item.popularity}</div>
                <div className="fs-10">Genres: {item.genres[0]}</div>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default TopArtists;
