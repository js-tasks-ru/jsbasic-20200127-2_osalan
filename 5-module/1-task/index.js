/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let tBodyRows = table.tBodies[0].rows;
  for (let row of tBodyRows) {
    let available = row.cells[3].getAttribute('data-available');
    console.log(available);
    if (available === null) {
      console.log('hidden');
      row.hidden = true;
    } else {
      row.classList.add(available === 'true' ? 'available' : 'unavailable');
    }
    row.classList.add(row.cells[2].innerText === 'm' ? 'male' : 'female');

    if (parseInt(row.cells[1].innerText) < 18) {
      row.style = 'text-decoration: line-through';
    }
  }
}
