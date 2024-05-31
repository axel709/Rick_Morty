const characterCount = document.querySelector('#character-count');
const locationCount = document.querySelector('#location-count');
const episodeCount = document.querySelector('#episode-count');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-bar');
    const showcase = document.querySelector('.showcase');
    const pagination = document.querySelector('.pagination');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.querySelector('.search-bar input').value;

        pagination.innerHTML = '';
        showcase.innerHTML = '';

        fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {
                if (data.results.length === 0) {
                    showcase.insertAdjacentHTML('beforeend', '<h2>No characters found</h2>');
                    return;
                }
                const charactersData = data.results;

                charactersData.forEach(character => {
                    const characterHTML = `
                        <article class="card">
                            <div class="img-container">
                                <button onclick="popCharacter(this)">
                                    <img src="${character.image}" alt="${character.name}" loading="lazy">
                                </button>
                            </div>
                            <div class="card-info">
                                <div class="section sec1">
                                    <button onclick="popCharacter(this)">
                                        <h2 class="hover temp-name">${character.name}</h2>
                                    </button>
                                    <span class="status">
                                        <span class="status-icon"></span> ${character.status} - ${character.species}
                                    </span>
                                </div>
                                <div class="section sec2">
                                    <span>Last known location:</span>
                                    <a href="#" class="hover">${character.location.name}</a>
                                </div>
                                <div class="section sec3">
                                    <span>First seen in:</span>
                                    <a href="#" class="hover">${character.origin.name}</a>
                                </div>
                            </div>
                        </article>
                    `;
                    showcase.insertAdjacentHTML('beforeend', characterHTML);
                });
            });
    });
});


fetch('https://rickandmortyapi.com/api/character')
    .then (response => response.json())
    .then(data => {
        characterCount.innerHTML = 'characters: ' + data.info.count;
    });

fetch('https://rickandmortyapi.com/api/location')
    .then (response => response.json())
    .then(data => {
        locationCount.innerHTML = 'locations: ' + data.info.count;
    });

fetch('https://rickandmortyapi.com/api/episode')
    .then (response => response.json())
    .then(data => {
        episodeCount.innerHTML = 'episodes: ' + data.info.count;
    });
