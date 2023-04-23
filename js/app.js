async function getData(type) {
  let url = `https://swapi.dev/api/${type}`;
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function renderData(type, keys, detail, keysDetail) {
  let records = await getData(type);
  let html = `<h2 class="text-center m-5">${type.toUpperCase()}</h2>`;

  records['results'].forEach(record => {
    render_details = "";
    cont=0;
    record[detail].forEach( url => {
      cont++;
      url_ns = url.slice(0,-1);
      link = `<a href="detail.html?detail=${detail}&id=${url_ns.substring(url_ns.lastIndexOf('/') + 1)}&from=${type}">${cont}</a> `;
      render_details += link;
      });
    let htmlSegment = `
                      <div class="card m-5" style="d-flex justify-content-center">
                        <div class="card-header text-center text-info">
                          <h3>${record[keys[0]]}</h3>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="text-center list-group-item">${keys[1]}: ${record[keys[1]]}</li>
                          <li class="text-center list-group-item">${keys[2]}: ${record[keys[2]]}</li>
                          <li class="text-center list-group-item">${keys[3]}: ${record[keys[3]]}</li>
                          <li class="text-center list-group-item">${detail}: ${render_details}</li>
                        </ul>
                      </div>`;
      html += htmlSegment;
  });

  let container = document.querySelector('.container');
  container.innerHTML = html;
}

function get_data_api(type, keys, detail, keysDetail) {
  renderData(type, keys, detail, keysDetail);
}

function planets() {
  get_data_api("planets", ['name', 'climate', 'orbital_period', 'gravity'], "films");
}

function spaceships() {
  get_data_api("starships", ['name', 'manufacturer', 'passengers', 'starship_class'], "films")
}

function vehicles() {
  get_data_api("vehicles", ['name', 'model', 'manufacturer', 'vehicle_class'], "films")
}

function characters() {
  get_data_api("people", ['name', 'hair_color', 'skin_color', 'eye_color'], "films")
}

function films() {
  get_data_api("films", ['title', 'opening_crawl', 'director', 'release_date'], "planets")
}

document.addEventListener('DOMContentLoaded', function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const from = urlParams.get('from');
  if(from=="films") {
    films();
  };
  if(from=="planets") {
    planets();
  };
  if(from=="starships") {
    spaceships();
  };
  if(from=="vehicles") {
    vehicles();
  };
  if(from=="people") {
    characters();
  };
}, false);
