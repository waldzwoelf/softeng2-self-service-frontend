let content = document.getElementById('content');

for (const i of Array(70).keys()) {
  content.appendChild(
    makeVacationCard({start: `2019-01-${i}`, end: `2019-01-${i+1}`})
  );
}

function makeVacationCard(vacation) {
  let clone = document.getElementById('card-info-template').content.cloneNode(true)
  let cloneInfo = clone.querySelector('.card-info');
  cloneInfo.appendChild(document.createElement('span')).textContent = `Start: ${vacation.start}`
  cloneInfo.appendChild(document.createElement('span')).textContent = `End: ${vacation.end}`
  let card = makeGenericCard('Vacation', clone)
  return card
}

function makeGenericCard(title, fragment) {
  let clone = document.getElementById('card-template').content.cloneNode(true)
  clone.querySelector('h3').textContent = title;
  clone.querySelector('.card').appendChild(fragment)
  return clone;
}

function getVacationCards(params) {
  // backend aufrufen
  // daten parsen
  // makeVacationCards karten erstellen
  // content ausleeren
  // appendChild machen auf content
}