'use strict';

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const queryString = require('query-string');

module.exports.hello = (event, context, callback) => {
  console.log('\n\nEvent body:\n', event.body);

  const parsed = queryString.parse(event.body);
  console.log('parsed:', parsed);

  const token = parsed.stripeToken;
  console.log('token:', token);

  return stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  })
  .then(() => {   
    const response = {      
      statusCode: 200,      
      headers: {        
        'Access-Control-Allow-Origin': '*',      
      },      
      body: JSON.stringify({        
        data: 'testing, bish'
      })
    };
    callback(null, response);  
  })
  .catch((error) => {
    console.log('error:', error);
    const response = {      
      statusCode: 200,      
      headers: {        
        'Access-Control-Allow-Origin': '*',      
      },      
      body: JSON.stringify({        
        data: {
          message: 'promises broken, bish',
          error: error
        }
      })
    };
    // next(error);
    callback(null, response);
  })
};
