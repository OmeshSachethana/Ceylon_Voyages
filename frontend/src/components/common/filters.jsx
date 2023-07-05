import { useState, useEffect } from 'react'
import { Input, Dropdown } from '.'

const Filters = ({ filters, setFilterQuery }) => {
  const [filtersLocalState, setFiltersLocalState] = useState(filters)

  useEffect(() => {
    const query = filtersLocalState.reduce((acc, curr) => {
      if (curr.value) {
        acc += `filter[${curr.key}]=${curr.options ? curr.value : `/${curr.value}/`}&`
      }
      return acc
    }, '')
    setFilterQuery(query)
  }, [filtersLocalState])

  const onFilterChange = (e, key) => {
    setFiltersLocalState(
      filtersLocalState.map((filter) => {
        if (filter.key === key) {
          filter.value = e.target.value
        }
        return filter
      }),
    )
  }

  return (
    <div className="w-full mb-4">
      <span className="text-3xl text-white font-semibold">Filters</span>
      <div className="w-full flex justify-start items-center gap-6">
        {filtersLocalState.map((filter, index) => {
          return (
            <div key={`filter-${filter.key}-${index}`} className="w-1/2 h-full flex flex-col justify-center items-start">
              <span className="text-md text-white mt-2 mb-3">{filter.label}</span>
              {filter.options ? (
                <Dropdown filterkey={filter.key} options={filter.options} className="h-12 sm:h-14" onChange={onFilterChange} />
              ) : (
                <Input
                  className="h-12 sm:h-14"
                  value={filter.value}
                  placeholder="Search"
                  onChange={(e) => {
                    onFilterChange(e, filter.key)
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Filters
