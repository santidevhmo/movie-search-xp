import fetchMovies from "./api/omdb"
import createMovieNode from "./utils/movieNode"
import { renderWatchlist } from "./utils/watchlist"

let resultsContainer = document.querySelector(".results-container")
let moviesContainer = document.querySelector(".movies-container")
let watchlistContainer = document.querySelector(".watchlist-container")

let searchBtn = document.getElementById("search-submit")

let watchlistViewBtn = document.querySelector(".open-watchlist-view")
let moviesViewBtn = document.querySelector(".open-movies-view")

let watchList = []

// Search Button "Submit" event handling
searchBtn.addEventListener("click", async (event) => {

    // Prevents the default form submission (page reload)
    event.preventDefault(); 
    
    // Get movie and clear value from search input
    let movie = document.getElementById("search-input").value
    document.getElementById("search-input").value = ""

    // Trigger fetch and render
    let moviesArr = await fetchMovies(movie)
    renderSearchResults(moviesArr)

})

// Button to open watchlist view
watchlistViewBtn.addEventListener("click", () => {
    moviesContainer.style.display = "none"
    watchlistContainer.style.display = "flex"
    renderWatchlist()
})
// Button to open Search Movies view
moviesViewBtn.addEventListener("click", () => {
    // Reveal Search view and hide watchlist view
    moviesContainer.style.display = "flex"
    watchlistContainer.style.display = "none"
})

function renderSearchResults(moviesArr) {
    // Reset results container
    resultsContainer.innerHTML = ""
    // Append 9 movies (3x3 grid = 9)
    for (let i = 0; i < 9; i++) {
        resultsContainer.appendChild(createMovieNode(moviesArr[i]))
    }
}