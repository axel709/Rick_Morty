const characterUrl = 'https://rickandmortyapi.com/api/character';
const locationUrl = 'https://rickandmortyapi.com/api/location';
const episodeUrl = 'https://rickandmortyapi.com/api/episode';

function fetchData(url) {
    return fetch(url)
    .then((response) => {
        if (!response.ok) {
            document.getElementById('statusIcon').style.background = 'red';
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log('There was an error!', error);
    });
}

fetchData(characterUrl)
    .then((data) => {
        document.getElementById('character-count').textContent = "Characters: " + data.info.count;
    });

fetchData(locationUrl)
    .then((data) => {
        document.getElementById('location-count').textContent = "Locations: " + data.info.count;
    });

fetchData(episodeUrl)
    .then((data) => {
        document.getElementById('episode-count').textContent = "Episodes: " + data.info.count;
    });
