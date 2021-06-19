import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ show: false, message: '' })
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('batman')

  const fetchUrl = async (url) => {
    setLoading(true)
    // console.log(url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.Response === 'True') {
        setMovies(data.Search)
        setError({ show: false, message: '' })
      } else {
        setError({ show: true, message: data.Error })
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUrl(`${API_ENDPOINT}&s=${query}`)
  }, [query])

  return (
    <AppContext.Provider value={{ loading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
