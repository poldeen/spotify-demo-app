import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';

const SpotifyTopItems = () => {
  const { response, error, loading, setLoading, fetchData } = useAxiosPrivate();

  useEffect(() => {
    fetchData({
      url: `me/top/artists`,
      method: 'GET'
    });
  }, []);

  return (
    <>
      <Row>
        <Col xs="12">
          <Carousel
            variant="dark"
            fade
            indicators={false}
            controls={false}
            pause="hover"
          >
            <Carousel.Item>
              <TopArtists />
            </Carousel.Item>
            <Carousel.Item>
              <TopTracks />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default SpotifyTopItems;
