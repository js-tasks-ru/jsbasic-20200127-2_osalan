/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let words = str.split('-');
  for (let i = 0; i < words.length; i++) {
    if (i != 0) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
  }
  return words.join('');
}
