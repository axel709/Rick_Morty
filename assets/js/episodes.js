for (let i=1; i < 51; i++) {
    fetch(`https://rickandmortyapi.com/api/episode/${i}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.episode)
            
        });
}