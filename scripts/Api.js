var email = document.getElementById('Email');
var ProfilePicture = document.getElementById('pfp');
const loginButton = document.getElementById('Login_Button');


const clientId = '91ede157c4a545a88c763206c4827888';
const redirectUri = 'http://127.0.0.1:5500/Spotify_Test.html';
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  
];

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(' '))}`;

const urlParams = new URLSearchParams(window.location.hash.substring(1));
const token = urlParams.get('access_token');


loginButton.onclick = function () {
  window.location.href = authUrl;
  getUserProfile(token);

}

fetch('https://api.spotify.com/v1/me', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => response.json())    
.then(data => {
  console.log('User data:', data);
  email.innerHTML = "Email: " + data.email;
  ProfilePicture.setAttribute('src', data.images[0].url);
  
})
.catch(error => {
  console.error('Error fetching data:', error);
});


