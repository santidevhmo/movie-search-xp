import createWatchlistNode from "./watchlistNode"

const STORAGE_KEY = "watchlist"

// -------------------------
// Methods:
// 1. Add to watchlist
// 2. Remove from watchlist
// 3. Search on watchlist
// 4. Render watchlist
// -------------------------

// ====== APPEND TO LOCAL STORAGE WATCHLIST =======
function addToWatchlist(movie) {

    // If local storage watchlist doesn't exist: initialize + append
    if (!localStorage.getItem(STORAGE_KEY)) {
        // Initialize watchlist as arr (will be arr of objects)
        let watchlist = []
        // Push the movie
        watchlist.push(movie)
        // Set localStorage value as arr as Stringified JSON
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))

        alert(`Your first watchlist movie, "${movie.Title}" was successfully added!`)

        // Else, just append new movie
    } else {

        // Get and parse the watchlist arr of movie objects
        let watchlist = JSON.parse(localStorage.getItem(STORAGE_KEY))

        // Push the new movie to the arr
        watchlist.push(movie)
        // Replace current localStorage arr to the new updated one
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))

        alert(`${movie.Title} successfully added to your watchlist!`)
    }

}

// ======= REMOVE FROM WATCHLIST =======
function removeFromWatchlist(movie) {
    // Get current watchlist arr as parsed
    let watchlist = JSON.parse(localStorage.getItem(STORAGE_KEY))
    // Remove this movie
    watchlist = watchlist.filter(movie => movie.imdbID !== movie.imdbID) // NOT movie poster due to ImdbID being a more unique key value option
    // Replace current localStorage arr to the new updated one
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    
    alert(`${movie.Title} successfully removed from your watchlist`)
}


// ======= SEARCH ON WATCHLIST ========

function searchWatchlist(movie) {

    if (!localStorage.getItem(STORAGE_KEY)) {
        throw new Error("ERROR: watchlist not initialized yet")
    }

    // Get and parse the watchlist arr of movie objects
    let watchlist = JSON.parse(localStorage.getItem(STORAGE_KEY))

    // Check if movie exists 
    for (let object of watchlist) {
        // If the movie IS in your watchlist
        if (object.imdbID === movie.imdbID) {
            return true
        }
    }

    // Else, movie not on watchlist
    return false
}

// ======= RENDER WATCHLIST ========

function renderWatchlist() {

    let watchlistResultsContainer = document.querySelector(".watchlist-results-container")

    const movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

    // Reset watchlist results container
    watchlistResultsContainer.innerHTML = ""

    // If watchlist is empty, show text
    if (movies.length === 0) {
        let emptyGridCell = document.createElement('div')
        let emptyTextNode = document.createElement('p')
        emptyTextNode.innerText = "Your watchlist is empty"
        emptyTextNode.style.fontSize = "25px"
        emptyTextNode.style.textAlign = "center"
        emptyTextNode.style.padding = "50px 0px"
        watchlistResultsContainer.appendChild(emptyGridCell)
        watchlistResultsContainer.appendChild(emptyTextNode)

    // Else, render the current movies in watchlist
    } else {
        for (let movie of movies) {
            watchlistResultsContainer.appendChild(createWatchlistNode(movie))
        }
    }

}



export { addToWatchlist, removeFromWatchlist, searchWatchlist, renderWatchlist }