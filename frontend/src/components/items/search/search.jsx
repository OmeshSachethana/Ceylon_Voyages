import { twMerge } from 'tailwind-merge'
import { SearchDropdown } from './dropdown'
import { useState } from 'react'
import { Transition } from '@headlessui/react'

const search = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    props.onSearch(e.target.value)
  }
  return (
    <div {...props} className={twMerge('bg-gray-50 shadow-md  py-10 w-[80%] top-[-4rem] rounded-sm absolute right-0 left-0 m-auto ', props.className)}>
      <div className="xs:mx-2 max-w-xl mx-auto flex gap-2 items-center">
        <div className=" relative shadow-md flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid  place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none border-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Explore Sri Lanka ..."
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        <SearchDropdown />
      </div>
    </div>
  )
}

export default search
