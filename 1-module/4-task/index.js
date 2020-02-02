/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let copyStr = str.toLowerCase();
  if (copyStr !== undefined && copyStr !== null && (copyStr.includes('1xBet'.toLowerCase()) || copyStr.includes('XXX'.toLowerCase()))) {
    return true;
  }
  return false;
}
