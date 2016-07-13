var find = require('lodash.find');
var keys = require('lodash.keys');

var errorMessages = {
  'auth_violation': 'Authorization error.  Please check you have the correct permissions.',
  'unauthorized_client': 'Authentication error. Invalid user credentials.',
  'FileTooBigException': 'SVG file size is too large.'
};

var getErrorMessage = function(err) {
  var errorKeys = keys(errorMessages);
  var message;
  var errorMatcher;

  if (err.code) {
    message = err.code + ': ' + err.hostname;
  }

  if (err.developerMessage) {
    errorMatcher = find(errorKeys, function(key) {
      return err.developerMessage.indexOf(key) >= 0;
    });
    message = errorMatcher ? errorMessages[errorMatcher] : err.developerMessage;
  }
  if (err.errorMessage) {
    message = err.errorMessage;
  }
  if (err.error) {
    message = errorMessages[err.error];
  }

  return message ? message : JSON.stringify(err);
};

module.exports = {
  getErrorMessage: getErrorMessage
};
