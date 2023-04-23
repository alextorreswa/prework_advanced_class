async function getData(type, id) {
  let url = `https://swapi.dev/api/${type}/${id}/`;
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function renderData(type, keys, detail, id) {
  let record = await getData(type, id);
  let html = `<h2 class="text-center m-5 text-white">${type.toUpperCase()}</h2>`;
  let htmlSegment = `
                    <div class="card m-5" style="d-flex justify-content-center">
                      <div class="card-header text-center text-info">
                        <h3>${record[keys[0]]}</h3>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="text-center list-group-item">${keys[1]}: ${record[keys[1]]}</li>
                        <li class="text-center list-group-item">${keys[2]}: ${record[keys[2]]}</li>
                        <li class="text-center list-group-item">${keys[3]}: ${record[keys[3]]}</li>

                      </ul>
                    </div>`;
    html += htmlSegment;

  let container = document.querySelector('.container');
  container.innerHTML = html;
}

function get_data_api(type, keys, detail, id) {
  renderData(type, keys, detail, id);
}

function planets(id) {
  get_data_api("planets", ['name', 'climate', 'orbital_period', 'gravity'], "films", id);
}

function spaceships(id) {
  get_data_api("starships", ['name', 'manufacturer', 'passengers', 'starship_class'], "films", id)
}

function vehicles(id) {
  get_data_api("vehicles", ['name', 'model', 'manufacturer', 'vehicle_class'], "films", id)
}

function characters(id) {
  get_data_api("people", ['name', 'hair_color', 'skin_color', 'eye_color'], "films", id)
}

function films(id) {
  get_data_api("films", ['title', 'opening_crawl', 'director', 'release_date'], "planets", id)
}

document.addEventListener('DOMContentLoaded', function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const detail = urlParams.get('detail');
  const id = urlParams.get('id');
  const from = urlParams.get('from');

  let container = document.querySelector('.btnspace');
  container.innerHTML = `<a class="btn btn-secondary" href="index.html?from=${from}" role="button">Back</a>`;

  if(detail=="films") {
    films(id);
  };
  if(detail=="planets") {
    planets(id);
  };
}, false);
