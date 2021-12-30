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
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render(rows);
    this.elem.addEventListener("click", (event) => this.onClick(event));
  }

  render(rows) {
    this.elem = document.createElement("table");
    let thead = document.createElement("thead");
    this.elem.append(thead);
    thead.innerHTML = `<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th></tr>`;

    let tbody = document.createElement("tbody");
    this.elem.append(tbody);
    for (let row of rows) {
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td>`;
      tbody.append(tr);
    }
  }

  onClick(event) {
    const tr = event.target.closest("tr");
    if (tr) {
      tr.remove();
    }
  }
}
