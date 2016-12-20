const request = require('request');

function getAllInstagrams(req, res) {
  const url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=2220345295.1677ed0.995fccc0ee1d47b4acb850aff67d534d';

  request.get(url, { json: true }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      console.log('data----', body.data);
    }
  });
}

module.exports.getAllInstagrams = getAllInstagrams;
