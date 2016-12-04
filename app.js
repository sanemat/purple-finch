require('marko/express'); // enable res.marko
require('marko/node-require').install();

const express = require('express');
const simpleOauthModule = require('simple-oauth2');
const template = require('./template.marko');
const path = require('path');
const rp = require('request-promise-native');
const URI = require('urijs');
const groundVertices = require('./ground_vertices');
const isEnableOauth2 = require('./is-enable-oauth2');
const transactionSelectColumns = require('./transaction-select-columns');
const fillAndSumTransactions = require('./fill-and-sum-transactions');
const summaryToGround = require('./summary-to-ground');

const app = express();
const oauth2 = isEnableOauth2() && simpleOauthModule.create({
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
  },
});

// Authorization uri definition
const authorizationUri = isEnableOauth2() && oauth2.authorizationCode.authorizeURL({
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

  oauth2.authorizationCode.getToken(options)
    .then((result) => {
      console.log('The resulting token: ', result);
      const token = oauth2.accessToken.create(result);

      const apiOptions = {
        uri: URI(process.env.TOKEN_HOST).pathname('/api/v1/transactions').toString(),
        headers: {
          Authorization: `Bearer ${token.token.token.access_token}`,
        },
      };
      return rp(apiOptions);
    })
    .then((result) => {
      console.log('transactions: ', result);
      const converted = summaryToGround(fillAndSumTransactions(JSON.parse(result)
        .transactions
        .map(transaction => transactionSelectColumns(transaction))));
      console.log(converted);
      return res.marko(template, {
        loggedIn: true,
        groundVertices: JSON.stringify(converted, null, ' '),
      });
    })
    .catch((error) => {
      console.log('Error', error.message);
      return res.json('Authentication failed');
    });
});

app.get('/success', (req, res) => {
  res.send('');
});

app.get('/', (req, res) => res.marko(template, {
  loggedIn: false,
  isEnableOauth2: isEnableOauth2(),
  groundVertices: JSON.stringify(groundVertices, null, ' '),
}));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Express server started on port 3000'); // eslint-disable-line
});

// Original example: Credits to [@lazybean](https://github.com/lazybean)
// https://github.com/lelylan/simple-oauth2/blob/a679b54dc492028a85679e54efb35c83d5bb9bbc/example/index.js
