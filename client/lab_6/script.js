const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if category or zip matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.category.match(regex) || place.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => `
        <ul>
            <li><div class="name">${place.name}</div></li>
            <div class="category">${place.category}</div>
            <div class="address">${place.address_line_1}</div>
            <div class="city">${place.city}</div>
            <div class="zip">${place.zip}</div>
        </ul>
        <br>
      `).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', displayMatches);
