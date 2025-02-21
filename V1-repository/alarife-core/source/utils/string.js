
/**
 * Camel case to sankey case
 * @param {String} str camel case
 * @returns {String} sankey case
 */
export const camelToSankey = str => {
  const result = str.charAt(0).toLowerCase() + str.slice(1);
  return result.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
};
