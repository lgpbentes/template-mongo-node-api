const _ = require('lodash');
const utf8 = require('utf8');

/**
 * Execute sanitizing and normalizing query processing
 *
 * @param {!string} query - string from req.query
 * @returns {string}
 */
function sanitizeQuery(query) {
  try {
    return decodeURIComponent(query);
  } catch (e) {
    return query;
  }
}

function sanitize(value) {
  if (Array.isArray(value)) {
    return value.map(x => sanitize(x));
  }
  let sanitized = sanitizeQuery(value);
  try {
    sanitized = decodeURIComponent(sanitized);
    // eslint-disable-next-line no-empty
  } catch (e) { }
  return sanitized;
}

function parseParamValue(value) {
  /**
   * Workaround: In some cases, needed to decode twice.
   */
  let parsedValue = sanitize(value);

  try {
    parsedValue = utf8.decode(parsedValue);
    // eslint-disable-next-line no-empty
  } catch (e) { }

  return parsedValue;
}

/**
 * Normalize the query parameters keys and values to lowercase
 * @return {Void}
 */
function NormalizeQueryParams() {
  return function normalizeQueryParams(req, res, next) {
    req.query = _.transform(req.query, (result, val, key) => {
      const lowerCaseKey = key.toLowerCase();

      if (Array.isArray(val)) { // parse each value from array params
        val.forEach((element) => {
          const parsedValue = parseParamValue(element);
          if (result[lowerCaseKey]) {
            result[lowerCaseKey].push(parsedValue);
          } else {
            result[lowerCaseKey] = [parsedValue];
          }
        });
      } else {
        result[lowerCaseKey] = parseParamValue(val);
      }
    });

    next();
  };
}

module.exports = NormalizeQueryParams;
