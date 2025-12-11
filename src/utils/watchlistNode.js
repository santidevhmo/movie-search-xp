
import { removeFromWatchlist, renderWatchlist } from "./watchlist"

export default function createWatchlistNode(movie) {

    let watchlistNode = document.createElement('div')
    watchlistNode.className = "movie"

    // ===== SET MOVIE POSTER : check for invalid poster URL's ======
    let moviePosterNode = document.createElement('div')
    moviePosterNode.className = "movie-poster"

    // Create an img element with CSS pixelation
    const img = document.createElement('img')
    img.className = 'pixelated-poster'

    // Append img to the poster container
    moviePosterNode.appendChild(img)
    watchlistNode.appendChild(moviePosterNode)

    // Set image source
    if (movie.Poster && movie.Poster !== "N/A") {
        img.src = movie.Poster
    } else {
        img.src = '/MoviePlaceholder.webp'
    }

    let movieInfoNode = document.createElement('div')
    movieInfoNode.className = "movie-info-container"
    watchlistNode.appendChild(movieInfoNode)
    
    let movieTitleNode = document.createElement('h4')
    movieTitleNode.classList = "movie-title"
    movieTitleNode.textContent = movie.Title
    movieTitleNode.style.textAlign = "center"
    let movieDetailsNode = document.createElement('div')
    movieDetailsNode.className = "movie-details"
    let movieYearNode = document.createElement('p')
    movieYearNode.classList = "movie-year"
    movieYearNode.textContent = movie.Year
    let watchListBtn = document.createElement('button')
    watchListBtn.classList = "watchlist-btn"
    watchListBtn.textContent = " - "
    

    // Click event listener for the watchlist btn below movie object
    watchListBtn.addEventListener("click", () => {
        // Remove movie from watchlist
        removeFromWatchlist(movie)
        // Re-render watchlist
        renderWatchlist()
    })

    movieInfoNode.appendChild(movieTitleNode)
    movieInfoNode.appendChild(movieDetailsNode)
    movieInfoNode.appendChild(movieYearNode)
    movieInfoNode.appendChild(watchListBtn)

    return watchlistNode
}