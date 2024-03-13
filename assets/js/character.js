const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1;
const characterUrl2 = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
const totalPages = 42;
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('[data-modal]');


if (currentPage < 1 || currentPage > totalPages) {
    window.location.href = '404.html';
}

fetch(characterUrl2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const charactersData = data.results;
        const template = document.querySelector('template');
        const showcase = document.querySelector('.showcase');

        charactersData.forEach(character => {
            const clone = document.importNode(template.content, true);

            const img = clone.querySelector('img');
            img.src = character.image;
            img.alt = character.name;

            const name = clone.querySelector('.section.sec1 button h2');
            name.textContent = character.name;

            const status = clone.querySelector('.status');
            let statusText;
            let statusColor;
            
            if (character.status === 'Alive') {
                statusText = 'Alive';
                statusColor = '#55cc44';
            } else if (character.status === 'Dead') {
                statusText = 'Dead';
                statusColor = '#d63d2e';
            } else {
                statusText = 'Unknown';
                statusColor = '#9e9e9e';
            }

            status.innerHTML = `<span class="status-icon" style="background-color: ${statusColor};"></span> ${statusText} - ${character.species}`;

            const lastLocation = clone.querySelector('.section.sec2 a');
            lastLocation.textContent = character.location.name;
            lastLocation.href = character.location.url;

            const firstLocation = clone.querySelector('.section.sec3 a');
            firstLocation.textContent = character.origin.name;
            firstLocation.href = character.origin.url;

            showcase.appendChild(clone);
        });
    })
    .catch(error => {
        console.error('There was a problem fetching the data:', error);
    });

function handlePaginationClick(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) {
        return;
    }
    
    currentPage = pageNum;
    updateUrl();
}

function updateUrl() {
    const newUrl = window.location.pathname + '?page=' + currentPage;
    window.history.pushState({ path: newUrl }, '', newUrl);
    window.location.reload();
    generatePaginationButtons();
}

function generatePaginationButtons() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 1) {
        paginationContainer.innerHTML += `<button onclick="handlePaginationClick(${currentPage - 1})">Previous</button>`;
    }

    for (let page = startPage; page <= endPage; page++) {
        paginationContainer.innerHTML += `<button ${page === currentPage ? 'class="active"' : ''} onclick="handlePaginationClick(${page})">${page}</button>`;
    }

    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `<button onclick="handlePaginationClick(${currentPage + 1})">Next</button>`;
    }

    const paginationButtons = paginationContainer.querySelectorAll('button');

    paginationButtons.forEach(button => {
        if (button.textContent === currentPage.toString()) {
            button.style.backgroundColor = '#F19D38';
        }
    });
}

generatePaginationButtons();

modal.addEventListener('click', e => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        closeModalWindow();
    }
});

function popChar(button) {
    const img = button.querySelector('img');
    const characterUrl = new URL(img.src);
    const id = characterUrl.pathname.split('/').pop().replace('.jpeg', '');
    console.log(`You clicked on ${id}`);
}

function popCharacter(button) {
    const card = button.parentElement.parentElement.parentElement;
    const img = card.querySelector('img');
    const characterUrl = new URL(img.src);
    const id = characterUrl.pathname.split('/').pop().replace('.jpeg', '');
    document.querySelector('.modal img').src = img.src;
    document.querySelector('.modal img').alt = img.alt;
    modal.showModal();
}

function closeModalWindow() {
    modal.close();
}