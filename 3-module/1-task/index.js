/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  return data.filter(el => el.age <= age)
    .map(el => el.name + ", " + el.balance)
    .join("\n");
}
