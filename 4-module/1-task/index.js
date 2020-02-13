/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  for (let friend of friends) {
    let il = document.createElement("li");
    il.innerHTML = friend.firstName + " " + friend.lastName;
    ul.append(il);
  }
  return ul;
}
