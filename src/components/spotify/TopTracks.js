import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Card, Image, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopTracks = () => {
  const { response, error, loading, setLoading, fetchData } = useAxiosPrivate();

  useEffect(() => {
    fetchData({
      url: `me/top/tracks`,
      method: 'GET'
    });
  }, []);
  return (
    <Card className="mb-3">
      <Card.Header>Top Tracks: {response?.total}</Card.Header>
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
              <h5 className="mb-1 text-white">{item.name}</h5>
              <small>Popularity: {item.popularity}</small>

              <div>
                <Image
                  src={
                    item.album.images.length === 0
                      ? 'src/assets/react.svg'
                      : item.album.images[0].url
                  }
                  fluid
                  variant="top"
                  height="80px"
                  width="80px"
                />
              </div>
              <div>
                <div className="fs-10">Artist: {item.artists[0].name}</div>
                <div className="fs-10">Album: {item.album.name}</div>
                <div className="fs-10">Track #: {item.track_number}</div>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default TopTracks;
