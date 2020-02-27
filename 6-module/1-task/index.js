/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
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
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');
    this.data = data;
    this.el.className = 'pure-table';
    this.el.addEventListener('click', (event) => {
      console.log(this);
      let target = event.target;
      if (target instanceof HTMLAnchorElement) {
        const tr = target.closest('tr');
        tr.remove();
        console.log(tr.id);
        this.onRemoved(parseInt(tr.id));
      }
    }, {bubbles: true});
    this.el.insertAdjacentHTML("afterbegin", `
<thead>
    <tr>
      <td>Name</td>
      <td>Age</td>
      <td>Salary</td>
      <td>City</td>
      <td></td>
    </tr>
</thead>
<tbody>
</tbody>
  `);

    for (let item of this.data) {
      this.el.tBodies[0].insertAdjacentHTML("beforeend", `
      <tr id="${item.id}">
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.salary}</td>
        <td>${item.city}</td>
        <td><a href="#delete" dataset-name="remove-href">X</a></td>
      </tr>
    `)
    }
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {
    for (let item of this.data) {
      if (item.id === id) {
        item.remove();
      }
    }
      console.log(`Из таблицы удален пользователь ${id}`);
    }
}

window.ClearedTable = ClearedTable;
