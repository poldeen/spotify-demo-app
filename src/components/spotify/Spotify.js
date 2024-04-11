import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from 'react-router-dom';
import SearchResults from './SearchResults';
import SpotifyHeader from './SpotifyHeader';
import SpotifyPlayer from './SpotifyPlayer';
import SpotifyTopItems from './SpotifyTopItems';

const Spotify = () => {
  const { response, error, loading, fetchData } = useAxiosPrivate();
  const [searchQuery, setSearchQuery] = useState('');
  const form = useRef();
  const checkBtn = useRef();
  const [myParams, setMyParams] = useSearchParams();

  useEffect(() => {
    myParams.delete('code');
    setMyParams(myParams);
  }, [myParams]);

  const handleSearch = e => {
    e.preventDefault();

    const spacesRemovedSearchQuery = searchQuery.replace(/\s+/g, '+');

    fetchData({
      url: `search?q=${spacesRemovedSearchQuery}&type=artist&market=US`,
      method: 'GET'
    });
  };

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const [options] = useState(['Artists', 'Tracks', 'Albums', 'Other']);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SpotifyHeader />
      <Row>
        <Col xs="12" lg="8">
          <Card className="mb-3">
            <Card.Header>
              <Form onSubmit={handleSearch} ref={form}>
                <Row className="g-2">
                  <Col>
                    <Form.Control
                      placeholder="Search..."
                      size="sm"
                      value={searchQuery}
                      onChange={handleInputChange}
                      type="text"
                      name="searchQuery"
                    />
                  </Col>
                  <Col className="d-md-block d-none" sm="auto">
                    <Form.Select size="sm">
                      <option value="">Search All</option>
                      {options.map(option => (
                        <option key={option}>{option}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col className="d-md-block d-none">
                    <Button
                      variant="primary"
                      className="me-2 mb-1"
                      type="submit"
                      size="sm"
                      ref={checkBtn}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Header>
            <Card.Body>
              {response ? <SearchResults results={response} /> : null}
            </Card.Body>
            <Card.Footer>
              <div>
                Results:
                {response === null ? 0 : response.artists.total}
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <SpotifyPlayer />
          <SpotifyTopItems />
        </Col>
      </Row>
    </>
  );
};

export default Spotify;
