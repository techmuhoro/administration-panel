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

/**
 * Builds query string and returns it. A Question mark is prepended. __NOTE__: Parsing full URLs e.g `"http://example.com/search?query=%40"` is _unsupported_.
 * @param {(string|URLSearchParams)} [queryParams] Query string or URLSearchParams object to append new entries. If not given, new query string is built from scratch.
 * @param {Object[]} entries Entries to add to `queryParams`.
 * @param {string} entries[].name The name of the query string field to add, i.e ?__name__=_value_
 * @param {string} entries[].value The value for `name` in query string, i.e ?_name_=__value__
 * @returns {string}
 *
 * @example <caption>Example usage 1</caption>
 * createQS("?query1=one", [{ name: "query2", value: "two"}, { name: "query3", value: "three"}]);
 * // outputs: ?query1=one&query2=two&query3=three
 * @example <caption>Example usage 2</caption>
 * createQS(undefined, [{ name: "query4", value: "four"}]); // outputs: ?query4=four
 */
export function createQS(queryParams, entries = [{ name: "", value: "" }]) {
  try {
    const newUrlQuery = new URLSearchParams(queryParams || undefined);
    if (entries instanceof Array) {
      entries.forEach((entry) => {
        const hasName = !!entry.name || entry.name === 0;
        const hasValue = !!entry.value || entry.value === 0;
        if (hasName && hasValue) {
          newUrlQuery.set(entry.name, entry.value);
        }
      });
    }

    const newQueryStr = `${newUrlQuery?.toString()?.length ? "?" + newUrlQuery.toString() : ""}`;

    return newQueryStr;
  } catch (error) {
    return "";
  }
}
