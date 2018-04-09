import * as appConfig from '../Config/appConfig';

/**
 * Safely get the value of a nested property from an object
 * @param {array} path - An array of strings, describing the path to the property
 * @param {object} obj - The parent object
 * @param def - The value to return if the property is not found
 */
export function getProp(path, obj, def) {
  return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : def, obj);
}

export function getShelfName(value) {
  return `${appConfig.shelves[value] || 'None'}`;
}