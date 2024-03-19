const template = document.querySelector('template');
const clone = document.importNode(template.content, true);
const episodeUrl2 = 'https://rickandmortyapi.com/api/episode?page=1';

fetch(episodeUrl2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const results = data.results;
        console.log(results);
        results.forEach(episode => {

            const episodeClone = document.importNode(clone, true);

            const titleElement = episodeClone.querySelector('.episode-title');
            const seasonElement = episodeClone.querySelector('.episode-season');
            const dateElement = episodeClone.querySelector('.episode-date');

            titleElement.textContent = episode.name;
            seasonElement.textContent = episode.episode;
            dateElement.textContent = `Uploaded on ${episode.air_date}`;

            document.querySelector('.all-episodes').appendChild(episodeClone);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
