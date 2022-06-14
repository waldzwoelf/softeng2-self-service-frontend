function makeGenericCard(fragment) {
  let clone = document.getElementById('card-template').content.cloneNode(true)
  clone.querySelector('.card').appendChild(fragment)
  return clone
}

function makeInfoCard(info) {
  let frag = document.createDocumentFragment()
  let div = frag.appendChild(document.createElement('div'))
  div.appendChild(document.createElement('h3')).textContent = `${info}`
  document.getElementById('requests').appendChild(makeGenericCard(frag))
}


function makeInfoCard2(info){
 let frag = document.createDocumentFragment()
  let div = frag.appendChild(document.createElement('div'))
  div.appendChild(document.createElement('h3')).textContent = `${info}`
  document.getElementById('available-vms').appendChild(makeGenericCard(frag))
}

function makeInfoCard3(info){
    let frag = document.createDocumentFragment()
    let div = frag.appendChild(document.createElement('div'))
    div.appendChild(document.createElement('h3')).textContent = `${info}`
    document.getElementById('approvable-requests').appendChild(makeGenericCard(frag))
}
