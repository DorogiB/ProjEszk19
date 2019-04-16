
/**
 * Creates the string representation of a date object.
 *
 * @export
 * @param {Date} date Date object which will be converted to string.
 * @returns {string} String representation of the given date.
 */
export function dateToString(date: Date): string {
  if (date !== null && date !== undefined) {
    const _date = new Date(date);
    return _date.toLocaleDateString('hu-HU', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  } else {
    return '';
  }
}
