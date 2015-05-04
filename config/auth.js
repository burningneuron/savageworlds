// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth': {
    'clientID': process.env.FACEBOOK_CLIENTID || 'INVALID', // your App ID
    'clientSecret': process.env.FACEBOOK_CLIENTSECRET || 'INVALID', // your App Secret
    'callbackURL': process.env.BASE_URL + process.env.FACEBOOK_CALLBACK
  },

  'twitterAuth': {
    'consumerKey': process.env.TWITTER_CONSUMERKEY || 'INVALID',
    'consumerSecret': process.env.TWITTER_CONSUMERSECRET || 'INVALID',
    'callbackURL': process.env.BASE_URL + process.env.TWITTER_CALLBACK
  },

  'googleAuth': {
    'clientID': process.env.GOOGLE_CLIENTID || 'INVALID',
    'clientSecret': process.env.GOOGLE_CLIENTSECRET || 'INVALID',
    'callbackURL': process.env.BASE_URL + process.env.GOOGLE_CALLBACK
  }

};
