fetch(characterUrl)
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

            const name = clone.querySelector('.section.sec1 a h2');
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
