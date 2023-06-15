async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [pos.coords.latitude, pos.coords.longitude];
  }

  let coords;
  let map = L.map("map");

  function buildMap() {
    map.setView(coords, 13);
  
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }
  
  function addMarkers() {
    L.marker(coords).addTo(map);
  }

  function fourSquares(choice) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8=',
            query: choice,
            ll: getCoords(coords)
        }
    }

    fetch('https://api.foursquare.com/v3/places/search', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

}

const btn = document.querySelector('.btn')
const sel = document.querySelector('#sel')

btn.addEventListener('click', (e) => {

    e.preventDefault();
    alert(sel.value);
    let choice = sel.value
    fourSquares(choice)

})
  

  window.onload = async () => {
    coords = await getCoords();
    buildMap();
    addMarkers();
  };

