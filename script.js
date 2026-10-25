
const movies = [
    
        {
    id: 1,
    title: "Interstellar",
    year: 2014,
    category: "Sci-Fi",
    rating: "8.7",
    badge: "TOP PICK",
    description: "A team of explorers travels beyond Earth to search for a new home for humanity among the stars.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85",
    trailer: "https://www.youtube.com/results?search_query=Interstellar+official+trailer"
},
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        category: "Action",
        rating: "9.0",
        badge: "POPULAR",
        description: "A masked hero faces a dangerous criminal who challenges the city and its sense of order.",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 3,
        title: "Into the Wild",
        year: 2007,
        category: "Adventure",
        rating: "8.1",
        badge: "ADVENTURE",
        description: "A young adventurer leaves familiar life behind and discovers the beauty and challenges of the wilderness.",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 4,
        title: "The Silent Sea",
        year: 2022,
        category: "Sci-Fi",
        rating: "7.5",
        badge: "SCI-FI",
        description: "A mysterious lunar mission sends a crew into a remote research facility hiding unexpected secrets.",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 5,
        title: "Night Mystery",
        year: 2025,
        category: "Mystery",
        rating: "8.3",
        badge: "MYSTERY",
        description: "A quiet town becomes the center of a mystery as strange clues lead to unexpected discoveries.",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 6,
        title: "The Last Journey",
        year: 2024,
        category: "Drama",
        rating: "8.4",
        badge: "NEW",
        description: "An emotional journey brings a family together as they face difficult choices and new beginnings.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 7,
        title: "Lost Horizon",
        year: 2023,
        category: "Adventure",
        rating: "7.9",
        badge: "EXPLORE",
        description: "A journey into remote mountains reveals hidden landscapes, unexpected obstacles, and new possibilities.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 8,
        title: "Beyond Tomorrow",
        year: 2026,
        category: "Sci-Fi",
        rating: "8.6",
        badge: "FEATURED",
        description: "A futuristic adventure explores how humanity might face the possibilities and challenges of tomorrow.",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=85"
    }
];


const trendingGrid = document.getElementById("trendingGrid");
const movieGrid = document.getElementById("movieGrid");
const watchlistGrid = document.getElementById("watchlistGrid");
const watchlistEmpty = document.getElementById("watchlistEmpty");
const emptyState = document.getElementById("emptyState");
const listCount = document.getElementById("listCount");

const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const categoryFilters = document.getElementById("categoryFilters");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const toast = document.getElementById("toast");

let selectedCategory = "All";
let searchTerm = "";
let watchlist = loadWatchlist();
let toastTimeout;

function loadWatchlist() {
    try {
        const saved = JSON.parse(localStorage.getItem("streamora-watchlist"));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveWatchlist() {
    try {
        localStorage.setItem("streamora-watchlist", JSON.stringify(watchlist));
    } catch {
        showToast("Browser storage is unavailable.");
    }
}

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function createMovieCard(movie) {
    const isSaved = watchlist.includes(movie.id);

    return `
       <article class="movie-card" data-movie-id="${movie.id}">
            <div class="poster">
                <img
                    src="${movie.image}"
                    alt="${escapeHTML(movie.title)} poster"
                    loading="lazy"
                >

                <span class="poster-badge">
                    ${escapeHTML(movie.badge)}
                </span>

                <button
                    class="add-btn ${isSaved ? "saved" : ""}"
                    data-watchlist="${movie.id}"
                    aria-label="${isSaved ? "Remove from" : "Add to"} watchlist"
                    title="${isSaved ? "Remove from watchlist" : "Add to watchlist"}"
                >${isSaved ? "✓" : "+"}</button>
            </div>

            <div class="movie-info">
                <h3>${escapeHTML(movie.title)}</h3>

                <div class="movie-meta">
                    <span>${movie.year} · ${escapeHTML(movie.category)}</span>
                    <span class="movie-rating">★ ${movie.rating}</span>
                </div>
            </div>
        </article>
    `;
}

function renderTrending() {
    if (!trendingGrid) return;

    trendingGrid.innerHTML = movies
        .slice(0, 4)
        .map(createMovieCard)
        .join("");
}


function renderMovies() {
    if (!movieGrid) return;

    const filteredMovies = movies.filter(movie => {
        const matchesCategory =
            selectedCategory === "All" ||
            movie.category === selectedCategory;

        const matchesSearch =
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.category.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    movieGrid.innerHTML = filteredMovies.map(createMovieCard).join("");

    if (emptyState) {
        emptyState.hidden = filteredMovies.length > 0;
    }

    // Render saved movies in My Watchlist
    const watchlistGrid = document.getElementById("watchlistGrid");
    const watchlistEmpty = document.getElementById("watchlistEmpty");

    if (watchlistGrid) {
        const savedMovies = movies.filter(movie =>
            watchlist.includes(movie.id)
        );

        watchlistGrid.innerHTML =
            savedMovies.map(createMovieCard).join("");

        if (watchlistEmpty) {
            watchlistEmpty.hidden = savedMovies.length > 0;
        }
    }

    // Show matching results under the search bar
    const searchResults = document.getElementById("searchResults");

    if (searchResults) {
        if (!searchTerm) {
            searchResults.innerHTML = "";
            searchResults.classList.remove("show");
        } else if (filteredMovies.length === 0) {
            searchResults.innerHTML =
                '<div class="search-no-results">No movies found.</div>';
            searchResults.classList.add("show");
        } else {
            searchResults.innerHTML = filteredMovies.map(movie => `
                <button
                    class="search-result-item"
                    type="button"
                    data-movie-id="${movie.id}"
                >
                    ${movie.title}
                    <span class="search-result-meta">${movie.category}</span>
                </button>
            `).join("");

            searchResults.classList.add("show");
        }
    }
}


function renderWatchlist() {
    if (!watchlistGrid) return;

    const savedMovies = movies.filter(movie =>
        watchlist.includes(movie.id)
    );

    watchlistGrid.innerHTML = savedMovies.map(createMovieCard).join("");

    if (watchlistEmpty) {
        watchlistEmpty.hidden = savedMovies.length > 0;
    }

    if (listCount) {
        listCount.textContent = savedMovies.length;
    }
}

function renderAll() {
    renderTrending();
    renderMovies();
    renderWatchlist();
}

function toggleWatchlist(id) {
    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(movieId => movieId !== id);
        showToast("Removed from your watchlist.");
    } else {
        watchlist.push(id);
        showToast("Added to your watchlist!");
    }

    saveWatchlist();
    renderAll();
}

document.addEventListener("click", event => {
    const watchlistButton = event.target.closest("[data-watchlist]");

    if (watchlistButton) {
        toggleWatchlist(Number(watchlistButton.dataset.watchlist));
    }
});

if (categoryFilters) {
    categoryFilters.addEventListener("click", event => {
        const button = event.target.closest("[data-category]");
        if (!button) return;

        selectedCategory = button.dataset.category;

        categoryFilters.querySelectorAll(".filter-btn").forEach(filter => {
            filter.classList.toggle("active", filter === button);
        });

        renderMovies();
    });
}

if (searchToggle && searchPanel) {
    searchToggle.addEventListener("click", () => {
        searchPanel.classList.toggle("open");

        if (searchPanel.classList.contains("open") && searchInput) {
            searchInput.focus();
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        console.log("Search:", searchTerm);
        renderMovies();
    });
}

if (clearSearch && searchInput) {
    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        searchTerm = "";
        renderMovies();
        searchInput.focus();
    });
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        menuToggle.textContent =
            navLinks.classList.contains("open") ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

renderAll();
console.log("Streamora JavaScript loaded!");

const searchResultsBox = document.getElementById("searchResults");

if (searchResultsBox) {
    searchResultsBox.addEventListener("click", function (event) {
        const resultButton = event.target.closest(".search-result-item");

        if (!resultButton) return;

        const movieId = Number(resultButton.dataset.movieId);
        const movieCard = movieGrid.querySelector(
            `[data-movie-id="${movieId}"]`
        );

        if (movieCard) {
            movieCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            searchResultsBox.classList.remove("show");
        }
    });
}

const movieModal = document.getElementById("movieModal");
const closeMovieModal = document.getElementById("closeMovieModal");
const modalImage = document.getElementById("modalImage");
const modalBadge = document.getElementById("modalBadge");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalCategory = document.getElementById("modalCategory");
const modalRating = document.getElementById("modalRating");
const modalDescription = document.getElementById("modalDescription");
const modalWatchlistBtn = document.getElementById("modalWatchlistBtn");
const modalWatchNowBtn = document.getElementById("modalWatchNowBtn");

if (modalWatchNowBtn) {
    modalWatchNowBtn.addEventListener("click", function () {
       window.open(
    "https://www.youtube.com/results?search_query=movie+trailers",
    "_blank",
    "noopener,noreferrer"
);
    });
}

let currentModalMovieId = null;

function openMovieModal(movieId) {
    console.log("Movie popup opened:", movieId);
    const movie = movies.find(item => item.id === Number(movieId));

    if (!movie || !movieModal) return;

    currentModalMovieId = movie.id;

    modalImage.src = movie.image;
    modalImage.alt = `${movie.title} poster`;
    modalBadge.textContent = movie.badge;
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year;
    modalCategory.textContent = movie.category;
    modalRating.textContent = `★ ${movie.rating}`;
    modalDescription.textContent =
        movie.description || "No description available.";

    updateModalWatchlistButton();

    movieModal.classList.add("show");
    console.log("Popup class:", movieModal.className);
    movieModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal() {
    if (!movieModal) return;

    movieModal.classList.remove("show");
    movieModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function updateModalWatchlistButton() {
    if (currentModalMovieId === null || !modalWatchlistBtn) return;

    const isSaved = watchlist.includes(currentModalMovieId);

    modalWatchlistBtn.textContent = isSaved
        ? "✓ Remove from Watchlist"
        : "+ Add to Watchlist";
}


document.addEventListener("click", function (event) {
    const card = event.target.closest(".movie-card");

    if (!card) return;

    if (event.target.closest(".add-btn")) return;

    const movieId = card.getAttribute("data-movie-id");

    console.log("Movie card clicked:", movieId);

    if (movieId) {
        openMovieModal(movieId);
    }
});

if (closeMovieModal) {
    closeMovieModal.addEventListener("click", closeModal);
}

if (movieModal) {
    movieModal.addEventListener("click", event => {
        if (event.target.hasAttribute("data-close-modal")) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

if (modalWatchlistBtn) {
    modalWatchlistBtn.addEventListener("click", () => {
        if (currentModalMovieId === null) return;

        toggleWatchlist(currentModalMovieId);
        updateModalWatchlistButton();
    });
}
