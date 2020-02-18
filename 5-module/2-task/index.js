/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {
  /**
   * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');
  this.el.insertAdjacentHTML("afterbegin", `
<thead>
    <tr>
      <td>Name</td>
      <td>Age</td>
      <td>Salary</td>
      <td>City</td>
    </tr>
</thead>
<tbody>
</tbody>
  `);

  for (let item of items) {
    this.el.tBodies[0].insertAdjacentHTML("beforeend", `
      <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.salary}</td>
        <td>${item.city}</td>
      </tr>
    `)
  }

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    let tableRows = Array.from(this.el.tBodies[0].rows)
      .sort((row1, row2) => {
        let first = row1.cells[column].innerHTML;
        let second = row2.cells[column].innerHTML;
        // преобразование к числу или строке
        first = !isNaN(+first) ? +first : first;
        second = !isNaN(+second) ? +second : second;
        // проверка на включенный реверс
        if (!desc) {
          return first > second ? 1 : -1;
        } else {
          return first < second ? 1 : -1;
        }
      });
    this.el.tBodies[0].append(...tableRows);
  };
}
