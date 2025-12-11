import { addToWatchlist, removeFromWatchlist, searchWatchlist } from "./watchlist"

export default function createMovieNode(movie) {

    // ===== MOVIE NODE INIT ======
    // (Created in JS to be able to manipulate styles such as bg img url and others)
    let movieNode = document.createElement('div')
    movieNode.className = "movie"

    // ===== SET MOVIE POSTER : check for invalid poster URL's ======
    let moviePosterNode = document.createElement('div')
    moviePosterNode.className = "movie-poster"

    // Create an img element with CSS pixelation
    const img = document.createElement('img')
    img.className = 'pixelated-poster'

    // Fallback to placeholder if image fails to load
    img.onerror = () => {
        img.src = '/MoviePlaceholder.webp'
    }

    // Append img to the poster container
    moviePosterNode.appendChild(img)
    movieNode.appendChild(moviePosterNode)

    // Set image source
    if (movie.Poster && movie.Poster !== "N/A") {
        img.src = movie.Poster
    } else {
        img.src = '/MoviePlaceholder.webp'
    }

    // ===== SET MOVIE INFO : title, year, watchlist btn ======
    let movieInfoNode = document.createElement('div')
    movieInfoNode.className = "movie-info-container"
    movieNode.appendChild(movieInfoNode)
    
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
    if (searchWatchlist(movie)) {
        watchListBtn.classList.toggle("on-watchlist")
        watchListBtn.textContent = " - "
    } else {
        watchListBtn.textContent = " + "
    }

    // Click event listener for the watchlist btn below movie object
    watchListBtn.addEventListener("click", () => {

        if (watchListBtn.textContent === " - ") {
            // Remove from watchlist and update btn action
            removeFromWatchlist(movie)
            watchListBtn.textContent = " + "
        } else if (watchListBtn.textContent === " + ") {
            // Add from watchlist and update btn action
            addToWatchlist(movie)
            watchListBtn.textContent = " - "
        } else {
            console.log("ERROR : unknown button text content (btn below movie)")
        }

    })

    // ===== APPEND ALL CHILD NODES TO MAIN NODE ======
    // (For then pushing parent node with all child nodes already included)
    movieInfoNode.appendChild(movieTitleNode)
    movieInfoNode.appendChild(movieDetailsNode)
    movieInfoNode.appendChild(movieYearNode)
    movieInfoNode.appendChild(watchListBtn)

    return movieNode
}