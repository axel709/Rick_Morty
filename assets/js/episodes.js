// Select the template and clone it
const template = document.querySelector('template');
const clone = document.importNode(template.content, true);

// Fetch data from the API
fetch(episodeUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const results = data.results;

        // Iterate over each episode data
        results.forEach(episode => {
            // Clone the template for each episode
            const episodeClone = document.importNode(clone, true);

            // Update the cloned template with episode data
            const titleElement = episodeClone.querySelector('.episode-title');
            const seasonElement = episodeClone.querySelector('.episode-season');
            const dateElement = episodeClone.querySelector('.episode-date');

            titleElement.textContent = `Name: ${episode.name}`;
            seasonElement.textContent = `Episode: ${episode.episode}`;
            dateElement.textContent = `Created: ${episode.created}`;

            // Append the updated cloned template to the document
            document.querySelector('.all-episodes').appendChild(episodeClone);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
