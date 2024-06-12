document.addEventListener("DOMContentLoaded", () => {
    let body = document.querySelector('body');
    let movies = document.querySelectorAll('#movies .movie-card button');
    const modalTemplate = document.querySelector('#modal');

    movies.forEach((movie, index) => {
        movie.addEventListener('click', () => {
            fetchDatas(index)
            translateModal();
        })
    });

    window.addEventListener('click', function (e) {
        const modalContent = document.querySelector('.modal-content');
        let closeButton = document.querySelector('.close-button img');

        if (body.classList.contains('modal-open') & !(body.classList.contains('modal-translating'))) {

            // Close modal when clicking outside or on close button
            if (!(modalContent.contains(e.target)) || e.target === closeButton) {
                closeModal();
                translateModal();
            }
        }
    });

    document.body.addEventListener('keydown', function (e) {
        if (body.classList.contains('modal-open') & !(body.classList.contains('modal-translating'))) {
            if (e.key == "Escape") {
                closeModal();
                translateModal();
            }
        }
    });

    function fetchDatas(index) {
        document.body.appendChild(modalTemplate.content.cloneNode(true));

        const modalContent = document.querySelector('.modal-content');
        const movieTitle = modalContent.querySelector('.movie-title');
        const movieDirector = modalContent.querySelector('.movie-director');
        const movieYear = modalContent.querySelector('.movie-year');
        const movieDescription = modalContent.querySelector('.movie-description');
        const movieLink = modalContent.querySelector('.movie-link');
        const movieIllustrationLink = modalContent.querySelector('.movie-illustration-link');
        const movieIllustration = modalContent.querySelector('.movie-illustration');
        const actors = modalContent.querySelector('.actors');

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                movieTitle.textContent = data[index].title;
                movieDirector.textContent = `De ${data[index].director}`;
                movieYear.textContent = data[index].year;
                movieLink.href = data[index].url;
                movieDescription.textContent = data[index].description;
                movieIllustration.src = `images/affiches/${data[index].illustration}`;
                movieIllustrationLink.href = data[index].url;

                data[index].actors.forEach(actor => {
                    let actorButton = document.createElement("a");
                    actorButton.innerText = actor.name;
                    actorButton.href = actor.url;
                    actorButton.target = "_blank";
                    actorButton.classList.add('actor');
                    actors.appendChild(actorButton);
                });

            })
            .then(() => {
                body.classList.add('modal-open');
            })
            .catch(error => console.error('Erreur lors du chargement des données JSON:', error));
    }

    function closeModal() {
        const modalContent = document.querySelector('.modal-content');

        body.classList.remove('modal-open');

        setTimeout(() => {
            modalContent.remove()
        }, "400");
    }

    function translateModal() {
        body.classList.add('modal-translating');

        setTimeout(() => {
            body.classList.remove('modal-translating');
        }, "400");
    }
});
