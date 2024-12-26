// Chargement des films sur index.html
document.addEventListener("DOMContentLoaded", () => {
    const popularMoviesContainer = document.getElementById("popular-movies");
    const newMoviesContainer = document.getElementById("new-movies");
    const searchInput = document.getElementById("search");
  
    fetch('../data/planche.json')
      .then(response => response.json())
      .then(data => {
        if (popularMoviesContainer) {
            displayMovies(data, popularMoviesContainer); // Films populaires
        }
        if (newMoviesContainer) {
            displayMovies(data, newMoviesContainer); // Nouveautés
        }
        
        // Recherche
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(query));
                if (popularMoviesContainer) {
                    popularMoviesContainer.innerHTML = "";
                    displayMovies(filteredMovies, popularMoviesContainer);
                }
            });
        }
      })
      .catch(error => console.error('Erreur de chargement des films:', error));
});
  
// Fonction pour afficher les films
function displayMovies(movies, container) {
    movies.forEach(movie => {
      const movieCard = `
        <div class="movie-card">
          <a href="movie-details.html?id=${movie.id}">
            <img src="./assets/images/${movie.poster}" alt="${movie.title}">
          </a>
          <h3>${movie.title}</h3>
        </div>`;
      container.innerHTML += movieCard;
    });
}
  
// Chargement des détails d'un film sur movie-details.html
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (movieId && window.location.pathname.includes('movie-details.html')) {
    fetch('./data/movies.json')
      .then(response => response.json())
      .then(data => {
        const movie = data.find(item => item.id === parseInt(movieId));
        if (movie) {
          document.getElementById("movie-title").textContent = movie.title;
          document.getElementById("movie-description").textContent = movie.description;
          document.getElementById("movie-release-date").textContent = movie.release_date;
          document.getElementById("movie-genre").textContent = movie.genre.join(", ");
          document.getElementById("movie-rating").textContent = movie.rating;
          document.getElementById("movie-poster").src = `./assets/images/${movie.poster}`;
        } else {
          console.error('Film non trouvé');
        }
      })
      .catch(error => console.error('Erreur de chargement des détails du film:', error));
  }
});



document.addEventListener("DOMContentLoaded", () => {
  // Affiche la loader pendant 3 secondes
  setTimeout(() => {
    // Masquer l'écran de chargement
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none";

    // Afficher le contenu principal
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "block";
  }, 1500);
});