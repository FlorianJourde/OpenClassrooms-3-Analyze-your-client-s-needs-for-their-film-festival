document.addEventListener("DOMContentLoaded", () => {
    let body = document.querySelector('body');
    let modal = document.querySelector('#modal');
    let closeButton = document.querySelector('#modal button');
    let moviesButtons = document.querySelectorAll('#movies .movie-card button')

    moviesButtons.forEach(movie => {
        movie.addEventListener('click', () => {
            openModal();
            translateModal();
        })
    });

    closeButton.addEventListener('click', () => {
        closeModal();
        translateModal();
    });

    window.addEventListener('click', function (e) {
        if (body.classList.contains('modal-open') & !(body.classList.contains('modal-translating'))) {
            if (!(modal.contains(e.target))) {
                closeModal();
                translateModal();
            }
        }
    });

    function openModal() {
        body.classList.add('modal-open');
    }

    function closeModal() {
        body.classList.remove('modal-open');
    }

    function translateModal() {
        body.classList.add('modal-translating');

        setTimeout(() => {
            body.classList.remove('modal-translating');
        }, "400");
    }
});
