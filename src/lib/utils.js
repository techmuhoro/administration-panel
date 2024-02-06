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
