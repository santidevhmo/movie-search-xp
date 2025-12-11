
export default async function fetchMovies(movie) {
    
    const API_KEY = import.meta.env.VITE_OMDB_KEY
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}&type=movie`
    
    try {
        
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        
        const data = await response.json()
        if (!data.Search) {
            return []
        }
        return data.Search

    } catch (error) {
       throw new Error(`Fetch error: ${error.message}`)
    }

}