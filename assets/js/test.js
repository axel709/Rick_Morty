const characterCount = document.querySelector('#character-count');
const locationCount = document.querySelector('#location-count');
const episodeCount = document.querySelector('#episode-count');
const showcase = document.querySelector('.showcase');
const pagination = document.querySelector('.pagination');
const inputSearch = document.querySelector('.input-search');

inputSearch.addEventListener('input', (event) => {
    showcase.innerHTML = '';

    const searchTerm = event.target.value;
    if (searchTerm === '') {
        window.location.reload();
    } else {
        pagination.style.display = 'none';
    }

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
            const totalPages = Math.ceil(data.info.count / data.info.pages);

            for (let page = 1; page <= totalPages; page++) {
                fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`)
                    .then(response => {
                        if (!response.ok) {
                            if (response.status === 404) {
                                // Handle page not found error
                                return Promise.reject('Page not found');
                            } else {
                                throw new Error('Network response was not ok');
                            }
                        }
                        return response.json();
                    })
                    .then(data => {
                        const charactersData = data.results;

                        // Check if the page has any content, else skip it
                        if (charactersData.length === 0) {
                            return;
                        }

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
                                                <h2 class="hover tempname">${character.name}</h2>
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
                    })
                    .catch(error => {
                        if (error === 'Page not found') {
                            console.log('eee');
                        } else {
                            console.error(error);
                        }
                    });
            }
        })
        .catch(error => {
            console.error(error);
        });
});
