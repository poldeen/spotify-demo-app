import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Image,
  ProgressBar,
  Row,
  Spinner
} from 'react-bootstrap';

const SpotifyPlayer = () => {
  const [initialization, setInitialization] = useState(true);
  const { response, fetchData } = useAxiosPrivate();
  const {
    response: devicesResponse,
    loading: devicesLoading,
    fetchData: fetchDevices
  } = useAxiosPrivate();
  const {
    response: responseData2,
    loading: updating,
    fetchData: updatePlayer
  } = useAxiosPrivate();

  const [playerState, setPlayerState] = useState({});

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [device, setDevice] = useState();
  const [volumeUpdate, setVolumeUpdate] = useState(false);

  const [debouncedVolume, setDebouncedVolume] = useState(null);

  useEffect(() => {
    fetchDevices({
      url: `me/player/devices`,
      method: 'GET'
    });
  }, []);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedVolume(playerState?.device?.volume_percent);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [playerState, 250]);

  useEffect(() => {
    fetchData({
      url: `me/player`,
      method: 'GET'
    });
  }, []);

  useEffect(() => {
    if (response !== null) {
      setPlayerState(response);
    }
  }, [response]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (!updating) {
        fetchData({
          url: `me/player`,
          method: 'GET'
        });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (devicesResponse !== null && initialization) {
      let deviceIndex = devicesResponse.devices.findIndex(
        item => item.is_active === true
      );

      if (deviceIndex === -1) {
        deviceIndex = 0;
      }

      const device = devicesResponse.devices[deviceIndex];

      if (device !== undefined) {
        setSelectedOptionIndex(deviceIndex);
        setDevice(device.id);
        setInitialization(false);
      }
    }
  }, [devicesResponse]);

  const handleEvent = event => {
    if (event === 'previous' || event === 'next') {
      updatePlayer({
        url: `me/player/${event}?device_id=${device}`,
        method: 'POST'
      });
    } else if (event === 'play' || event === 'pause') {
      let playing = true;
      let paused = false;
      if (event === 'play') {
        setPlayerState({ ...playerState, is_playing: playing });
      } else {
        setPlayerState({ ...playerState, is_playing: paused });
      }

      updatePlayer({
        url: `me/player/${event}?device_id=${device}`,
        method: 'PUT'
      });
    }
  };

  const updateRangeVolume = event => {
    const value = parseInt(event.target.value);
    setVolumeUpdate(true);
    setPlayerState({
      ...playerState,
      device: { ...device, volume_percent: value }
    });
  };

  useEffect(() => {
    console.log(playerState);
    console.log(playerState?.device.volume_percent);
    updatePlayer({
      url: `me/player/volume?volume_percent=${playerState?.device?.volume_percent}&device_id=${playerState?.device?.id}`,
      method: 'PUT'
    });
  }, [debouncedVolume]);

  const handleChange = (event, index) => {
    setSelectedOptionIndex(index);
  };

  return (
    <Row>
      <Col xs="12">
        <Card className="mb-3">
          {devicesLoading ? (
            <Spinner />
          ) : (
            <Card.Header>
              <Card.Title>Spotify Player: </Card.Title>
              <small>
                Device:
                <Form.Select
                  size="sm"
                  name="id"
                  aria-label="Default select example"
                  onChange={e => handleChange(e, e.target.selectedIndex)}
                  value={selectedOptionIndex}
                >
                  {devicesResponse &&
                    devicesResponse.devices.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
              </small>
            </Card.Header>
          )}
          <Card.Body>
            {response !== '' ? (
              <Row>
                <Col xs="auto">
                  <Image
                    className="m-3"
                    height="100px"
                    src={playerState?.item?.album.images[0].url}
                  />
                  <ProgressBar
                    style={{ height: '1px' }}
                    className="mb-3"
                    now={
                      (playerState?.progress_ms /
                        playerState?.item?.duration_ms) *
                      100
                    }
                  />
                </Col>
                <Col>
                  <div>Artist: {playerState?.item?.artists[0].name}</div>
                  <div>Album: {playerState?.item?.album.name}</div>
                  <div>Track: {playerState?.item?.name}</div>

                  <FontAwesomeIcon className="fs-9 me-3" icon="volume-up" />
                  <input
                    className="form-range"
                    type="range"
                    min="0"
                    max="100"
                    value={playerState?.device.volume_percent}
                    onChange={updateRangeVolume}
                    id="customRange2"
                  ></input>

                  <ButtonGroup>
                    <Button
                      variant="link"
                      className="me-2 mb-1"
                      onClick={() => handleEvent('previous')}
                    >
                      <FontAwesomeIcon icon="step-backward" />
                    </Button>
                    {playerState?.is_playing ? (
                      <Button
                        variant="link"
                        className="me-2 mb-1"
                        onClick={() => handleEvent('pause')}
                      >
                        <FontAwesomeIcon icon="pause" />
                      </Button>
                    ) : (
                      <Button
                        variant="link"
                        className="me-2 mb-1"
                        onClick={() => handleEvent('play')}
                      >
                        <FontAwesomeIcon icon="play" />
                      </Button>
                    )}

                    <Button
                      variant="link"
                      className="me-2 mb-1"
                      onClick={() => handleEvent('next')}
                    >
                      <FontAwesomeIcon icon="step-forward" />
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            ) : (
              "Please ensure you're playing Spotify on a device that is tied to the same account you authorized here."
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SpotifyPlayer;
