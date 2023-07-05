import { useState, useEffect } from 'react'
import { MdOutlineCircle, MdArrowDropDownCircle } from 'react-icons/md'

const Sorts = ({ sorts, setSortQuery }) => {
  const [sortLocalState, setSortLocalState] = useState(sorts)

  useEffect(() => {
    const query = sortLocalState.reduce((acc, curr) => {
      if (curr.direction !== 0) {
        acc += `sort[${curr.key}]=${curr.direction}&`
      }
      return acc
    }, '')
    setSortQuery(query)
  }, [sortLocalState])

  const onSortChange = (key, direction) => {
    setSortLocalState(
      sortLocalState.map((sort) => {
        if (sort.key === key) {
          sort.direction = direction
        }
        return sort
      }),
    )
  }

  return (
    <div className="w-full mt-4">
      <div className="w-full flex justify-start items-center gap-6">
        {sortLocalState.map((sort, index) => {
          return (
            <div key={`sort-${sort.key}-${index}`} className="w-1/2 md:w-1/4 h-full flex flex-col justify-center items-start">
              <Sort sort={sort} onSortChange={onSortChange} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Sort = ({ sort, onSortChange }) => {
  const [directionLocalState, setDirectionLocalState] = useState(sort.direction)

  useEffect(() => {
    onSortChange(sort.key, directionLocalState)
  }, [directionLocalState])

  const setSortOrder = () => {
    if (directionLocalState === 0) {
      setDirectionLocalState(-1)
    } else if (directionLocalState === -1) {
      setDirectionLocalState(1)
    } else {
      setDirectionLocalState(0)
    }
  }

  return (
    <div className="w-full h-full flex justify-start items-center">
      <div className="text-2xl text-white mr-2 cursor-pointer" onClick={setSortOrder}>
        {directionLocalState === 0 ? <MdOutlineCircle /> : <MdArrowDropDownCircle className={`text-primary transform ${directionLocalState === 1 ? '' : 'rotate-180'}`} />}
      </div>
      <span className="text-md text-white font-semibold">{sort.label}</span>
    </div>
  )
}

export default Sorts
