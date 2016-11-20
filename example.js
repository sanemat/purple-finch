require('marko/express'); //enable res.marko
require('marko/node-require').install();

const express = require('express');
const simpleOauthModule = require('simple-oauth2');
const template = require('./template.marko');

const path = require('path');
const app = express();
const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
  },
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: process.env.REDIRECT_URI,
  scope: 'read',
  code: 'code',
});

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
    redirect_uri: process.env.REDIRECT_URI,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res.marko(template, {
      loggedIn: true,
      debug: JSON.stringify(token),
    });
  });
});

app.get('/success', (req, res) => {
  res.send('');
});

app.get('/', (req, res) => {
  return res.marko(template, {
    loggedIn: false,
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Express server started on port 3000'); // eslint-disable-line
});


// Credits to [@lazybean](https://github.com/lazybean)
