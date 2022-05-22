//check if not logged in -> login pag

function makeGenericCard(fragment) {
  let clone = document.getElementById('card-template').content.cloneNode(true)
  clone.querySelector('.card').appendChild(fragment)
  return clone
}

//dbg
VMView.dbg()
