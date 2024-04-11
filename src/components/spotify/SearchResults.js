import { capitalize } from 'helpers/utils';
import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const SearchResults = results => {
  console.log(results);

  return (
    <Row className="g-4">
      {results.results.artists.items.map((item, index) => (
        <Col sm={6} lg={4} key={index}>
          <Card style={{ height: '100%' }}>
            <Image
              src={
                item.images.length === 0
                  ? 'src/assets/react.svg'
                  : item.images[0].url
              }
              fluid
              variant="top"
            />

            <Card.Body>
              <Card.Title as="h5">{item.name}</Card.Title>
              <Card.Text>
                Followers: {item.followers.total}
                <br />
                Genres:
                {item.genres.map((genre, id) => (
                  <li key={id}>{capitalize(genre)}</li>
                ))}
              </Card.Text>
            </Card.Body>
            <Button
              color="primary"
              size="sm"
              href={item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Spotify
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
