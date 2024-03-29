export function convertToNumber(str) {
  if (!str) return null;

  if (isNaN(Number(str))) {
    return null;
  }

  return Number(str);
}

/**
 *
 * @param {object} obj
 * @param {array} whitelist
 * @returns object
 *
 * Given an object and a whitelist, this function will return an new filtered object with only the keys in the whitelist
 */
export function filterObject(obj, whitelist) {
  const cleanObj = {};

  for (let [key, value] of Object.entries(obj)) {
    if (whitelist.includes(key)) {
      cleanObj[key] = value;
    }
  }

  return cleanObj;
}

export function convertStringSearchParamsToObj(str) {
  const params = new URLSearchParams(str);

  const obj = {};

  for (let [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
}

export function backendDateFormat(str) {
  if (!str) {
    return "";
  }
  const date = new Date(str);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}


/**
 * This function is a method to pluck _non-empty_ properties __from__ `targetObject` __into__ new object.
 * `keys` array should be passed containing keys to be extracted from `targetObject`.
 *
 * An empty object is returned if none of the keys specified in `keys` array is found on `targetObject`.
 * @param {string[]} [keys = []]
 * @param {Object} [targetObject = {}]
 * @returns {Object} Returns an object
 */
export function pluckProperties(keys = [], targetObject = {}) {
  if (keys instanceof Array) {
    const filtered = keys.reduce((pileValue, key) => {
      if (targetObject[key]) {
        pileValue[key] = targetObject[key];
      }
      return pileValue;
    }, {});

    return filtered;
  } else {
    return {};
  }
}