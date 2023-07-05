import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SearchDropdown } from './dropdown'
import { searchTour } from '../../../services/tours'

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    try {
      if (searchTerm.length > 3) {
        const response = await searchTour(searchTerm, false)

        setSearchResults(response.data.length === 0 ? [{ tourName: 'No tours found' }] : response.data)
      } else if (searchTerm.length === 0) {
        setSearchResults([])
      } else {
        setSearchResults([{ tourName: 'Search term must be at least 3 characters long' }])
      }
    } catch (error) {
      console.error(error)
      setSearchResults([])
    }
  }

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !text) return text
    const regex = new RegExp(searchTerm, 'gi')
    if (searchTerm.length > 3) return text.replace(regex, (match) => `<span class="bg-yellow-500 px-1 py-0.5 rounded-sm text-white">${match}</span>`)
    else return text
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm])

  return (
    <div {...props} className={twMerge('bg-gray-50 shadow-md py-6 md:py-10 z-modal  w-[90%] md:w-[60%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   rounded-sm absolute right-0  m-auto', props.className)}>
      <div className="max-w-xl mx-auto flex gap-2 items-center px-4 md:px-0">
        <div className="relative shadow-md flex items-center w-full h-10 md:h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300 z-[100] border-2 border-white bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input className="peer h-full w-full outline-none border-none text-sm text-gray-700 pr-2 user-select-none focus:outline-none" type="text" id="search" placeholder="Explore Sri Lanka ..." value={searchTerm} onChange={handleInputChange} autoComplete="off" />
          {searchTerm.length > 0 && (
            <button className="absolute px-4 right-0 hover:text-red-600 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setSearchTerm('')}>
              x
            </button>
          )}
        </div>
        <SearchDropdown />
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 absolute bg-gray-100  md:w-full  max-h-72 overflow-y-auto z-modal">
          {searchResults.map((result, index) => (
            <div key={result._id} className={`${index !== 0 && 'border-t border-gray-200'} py-2 px-4 hover:bg-slate-200`}>
              <a href={`/tour/${result._id}`}>
                <div className="font-semibold inline-block mr-2" dangerouslySetInnerHTML={{ __html: highlightSearchTerm(result.tourName) }} />
                {result.duration && <span className="text-sm">| {`${result.duration} ${result.duration === 1 ? 'Day' : 'Days'}`}</span>}
                <div className="text-gray-500 text-xs" dangerouslySetInnerHTML={{ __html: highlightSearchTerm(result.description) }} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
