import { capitalize } from 'helpers/utils';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Popover,
  Row,
  Spinner
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SpotifyHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { response, error, loading, setLoading, fetchData } = useAxiosPrivate();

  useEffect(() => {
    fetchData({
      url: `me/player/recently-played`,
      method: 'GET'
    });
  }, []);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Tracks: {response?.items.length}</Popover.Header>
      <Popover.Body>
        {loading ? (
          <Spinner />
        ) : (
          response &&
          response.items.map((item, index) => (
            <li key={index}>{item.track.name}</li>
          ))
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex gap-2 flex-wrap flex-between-center">
        {user.length === 0 || loading ? (
          <Spinner />
        ) : (
          <Container>
            <Row>
              <Col xs lg="1" className="p2">
                <Link to={user?.external_urls?.spotify} target="_blank">
                  <Image height="64px" width="64px" src={user?.images[1].url} />
                </Link>
              </Col>
              <Col xs lg="7" className="p2">
                <Row>
                  <Col>
                    <Link
                      style={{ textDecoration: 'none', color: 'MenuText' }}
                      to={user?.external_urls?.spotify}
                      target="_blank"
                    >
                      <Card.Title>{user?.display_name}</Card.Title>
                      Spotify Account
                    </Link>
                  </Col>
                  <Col>
                    <div className="fs-10">
                      Subscriber Level: {capitalize(user?.product)}
                    </div>
                    <div className="fs-11">Country: {user?.country}</div>
                    <div className="fs-11">
                      Followers: {user?.followers.total}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md="auto" className="p2">
                <Button
                  variant="primary"
                  size="md"
                  icon="envelope"
                  className="me-2"
                  href={`mailto:${user?.email}`}
                  target="_blank"
                >
                  <span className="d-none d-sm-inline-block">Message</span>
                </Button>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <Button variant="falcon-default" size="md" icon="users">
                    <span className="d-none d-sm-inline-block">
                      Recent Tracks
                    </span>
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </Container>
        )}
      </Card.Header>
    </Card>
  );
};

export default SpotifyHeader;
