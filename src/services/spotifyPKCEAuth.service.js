const login = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  redirectToAuthCodeFlow(clientId);

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://localhost:3000');
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);
    params.append(
      'scope',
      ' user-read-email ' +
        'user-read-private ' +
        'playlist-read-private ' +
        'user-library-read ' +
        'user-read-recently-played ' +
        'user-top-read ' +
        'user-follow-read ' +
        'user-read-playback-state ' +
        'user-modify-playback-state'
    );

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
};

const AuthServicePKCE = {
  login
};

export default AuthServicePKCE;
