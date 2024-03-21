const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1;
const episodeUrl2 = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;
const totalPages = 3;

const template = document.querySelector('template');
const clone = document.importNode(template.content, true);

if (currentPage < 1 || currentPage > totalPages) {
    window.location.href = '404.html';
};

fetch(episodeUrl2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const results = data.results;
        results.forEach(episode => {
            const episodeClone = document.importNode(clone, true);
            const episodeContainer = episodeClone.querySelector('.episode-container');
            const titleElement = episodeClone.querySelector('.episode-title');
            const seasonElement = episodeClone.querySelector('.episode-season');
            const dateElement = episodeClone.querySelector('.episode-date');

            episodeContainer.classList.add(`episode-${episode.id}`);

            titleElement.textContent = episode.name;
            seasonElement.textContent = episode.episode;
            dateElement.textContent = `Uploaded on ${episode.air_date}`;

            document.querySelector('.all-episodes').appendChild(episodeClone);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


function handlePaginationClick(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) {
        return;
    }

    currentPage = pageNum;
    updateUrl();
}

function updateUrl() {
    const newUrl = window.location.pathname + `?page=${currentPage}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    window.location.reload();
    generatePaginationButtons();
}

function generatePaginationButtons() {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 1) {
        pagination.innerHTML += `<button onclick="handlePaginationClick(${currentPage - 1})">Previous</button>`;
    }

    for (let page = startPage; page <= endPage; page++) {
        pagination.innerHTML += `<button ${page === currentPage ? 'class="active"' : ''} onclick="handlePaginationClick(${page})">${page}</button>`;
    }

    if (currentPage < totalPages) {
        pagination.innerHTML += `<button onclick="handlePaginationClick(${currentPage + 1})">Next</button>`;
    }

    const paginationButtons = pagination.querySelectorAll('button');

    paginationButtons.forEach(button => {
        if (button.textContent === currentPage.toString()) {
            button.style.backgroundColor = '#F19D38';
        }
    });
}

generatePaginationButtons();


function loadCharacters(container) {
    const episodeContainer = container.closest('.episode-container');
    const episodeIDClass = episodeContainer.classList[1];

    if (episodeIDClass && episodeIDClass.includes('-')) {
        const episodeID = episodeIDClass.split('-')[1];
        const episodeURL3 = `https://rickandmortyapi.com/api/episode/${episodeID}`;

        fetch(episodeURL3)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const characters = data.characters;
                const midCont = episodeContainer.querySelector('.mid-cont');

                container.remove();

                const characterListDiv = document.createElement('div');
                characterListDiv.classList.add('character-list');

                characters.forEach(characterURL => {
                    fetch(characterURL)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            const characterName = data.name;
                            const characterStatus = data.status;
                            const characterSpecies = data.species;
                            const characterImage = data.image;

                            const characterDiv = document.createElement('div');
                            characterDiv.classList.add('character');

                            const imageContainer = document.createElement('div');
                            imageContainer.classList.add('image-container');
                            const characterImageElement = document.createElement('img');
                            characterImageElement.src = characterImage;
                            characterImageElement.alt = 'Character Image';
                            characterImageElement.classList.add('character-image');
                            imageContainer.appendChild(characterImageElement);

                            const characterContainer = document.createElement('div');
                            characterContainer.classList.add('character-container');
                            const characterNameElement = document.createElement('p');
                            characterNameElement.classList.add('character-name');
                            characterNameElement.textContent = characterName;
                            const episodeCharStatus = document.createElement('span');
                            episodeCharStatus.classList.add('episode-char-status');
                            const statusIcon = document.createElement('span');
                            statusIcon.classList.add('episode-char-icon');
                            statusIcon.style.backgroundColor = characterStatus === 'Alive' ? '#2ecc71' : characterStatus === 'Dead' ? '#e74c3c' : '#95a5a6';
                            episodeCharStatus.appendChild(statusIcon);
                            episodeCharStatus.innerHTML += `${characterStatus} - ${characterSpecies}`;
                            characterContainer.appendChild(characterNameElement);
                            characterContainer.appendChild(episodeCharStatus);

                            characterDiv.appendChild(imageContainer);
                            characterDiv.appendChild(characterContainer);

                            characterListDiv.appendChild(characterDiv);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                });

                midCont.appendChild(characterListDiv);
                midCont.parentElement.parentElement.style.height = '60vh';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.error("Episode ID not found or invalid class structure.");
    }
}
