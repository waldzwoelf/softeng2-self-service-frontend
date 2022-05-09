//check if not logged in -> login page

function makeGenericCard(fragment) {
  let clone = document.getElementById('card-template').content.cloneNode(true)
  clone.querySelector('.card').appendChild(fragment)
  return clone;
}


